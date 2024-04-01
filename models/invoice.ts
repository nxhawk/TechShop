import prisma from '@/libs/prismadb';
import {
    NotEnoughQuantity,
    ProductNotFound,
    decreaseProductQuantity,
    increaseProductQuantity,
    increaseProductSold,
    decreaseProductSold
} from './product';
import { UserNotFound } from './user';
import {
    Address,
    Attachment,
    Brand,
    Category,
    Invoice,
    InvoiceItem,
    Product,
    Status,
} from '@prisma/client';

export type InvoiceWithProducts = Invoice & {
  address: Address;
  InvoicesItem: (InvoiceItem & {
      Product: Product & {
          category: Category | null;
          brand: Brand | null;
          attachments: Attachment[];
      };
  })[];
};

export type InvoiceItemWithProduct = InvoiceItem & {
  Product: Product & {
      category: Category | null;
      brand: Brand | null;
      attachments: Attachment[];
  };
};

export const InvoiceNotFound = new Error('Invoice not found');
export const InvalidStatus = new Error('Invalid status');
export const InvoiceNotDelivered = new Error('Invoice not delivered');

export async function listInvoices(userId?: string) {
  return await prisma.invoice.findMany({
    where:{
      userId
    },
    orderBy:{
      createAt:'desc'
    },
    include:{
      address: true,
      InvoicesItem:{
        include:{
          Product:{
            include:{
              attachments: true,
              category: true,
              brand: true,
            }
          }
        }
      }
    }
  })
}

export async function createInvoice(
  userId: string,
  addressId: string,
  productId?: string,
  quantity?: number,
) {
  if (productId && quantity) {
    const product = await prisma.product.findUnique({
      where:{
        id: productId,
      }
    });

    if (!product) {
      throw ProductNotFound;
    }

    if (product.quantity < quantity) {
      throw NotEnoughQuantity;
    }

    const invoice = await prisma.invoice.create({
      data:{
        userId,
        total: product.price * quantity * (1 - product.sale),
        addressId,
        InvoicesItem:{
          create:{
            productId,
            quantity,
          }
        }
      },
      include:{
        InvoicesItem:{
          include: {
            Product: true,
          },
        }
      }
    })

    decreaseProductQuantity(productId, quantity);

    return invoice;
  }
  
  const cart = await prisma.cart.findFirst({
    where:{
      User:{
        id:userId
      }
    },
    include:{
      CartItem:{
        include:{
          Product: true,
        }
      }
    }
  })

  if (!cart){
    throw UserNotFound
  }

  let total = 0;
  const invoiceItems: { productId: string; quantity: number }[] = [];
  cart.CartItem.forEach(item=>{
    if (item.Product.quantity < item.quantity){
      throw NotEnoughQuantity;
    }

    total += item.Product.price * item.quantity * (1 - item.Product.sale);
    invoiceItems.push({
      productId: item.productId,
      quantity: item.quantity,
    })
  })

  const invoice = await prisma.invoice.create({
    data:{
      userId,
      addressId,
      total,
      InvoicesItem:{
        createMany:{
          data: invoiceItems
        }
      }
    }
  })

  invoiceItems.forEach(async item => {
    await decreaseProductQuantity(item.productId, item.quantity);
  });

  return invoice;
}

export async function updateInvoice(id: string, status: string) {
  if (
    [
        Status.PENDING,
        Status.PROCESSING,
        Status.DELIVERING,
        Status.DELIVERED,
        Status.CANCELLED,
        Status.RETURNING,
        Status.RETURNED,
    ].indexOf(status as Status) === -1
  ) {
    throw InvalidStatus;
  }

  const newStatus = status as Status;

  const invoice= await prisma.invoice.findUnique({
    where:{id},
    include:{
      InvoicesItem:{
        include:{
          Product:true
        }
      }
    }
  })

  if (!invoice) {
    throw InvoiceNotFound;
  }
  
  switch(newStatus){
    case Status.PENDING: {
      throw InvalidStatus;
    }
    case Status.PROCESSING: {
      if (invoice.status !== Status.PENDING) {
          throw InvalidStatus;
      }
      break;
    }
    case Status.DELIVERING: {
      if (invoice.status !== Status.PROCESSING) {
          throw InvalidStatus;
      }
      break;
    }
    case Status.DELIVERED: {
      if (invoice.status !== Status.DELIVERING) {
        throw InvalidStatus;
      }
      invoice.InvoicesItem.forEach(async item => {
        return increaseProductSold(item.productId, item.quantity);
      });
      break;
    }
    case Status.CANCELLED: {
      if (invoice.status !== Status.PENDING) {
        throw InvalidStatus;
      }
      invoice.InvoicesItem.forEach(async item => {
        return increaseProductQuantity(item.productId, item.quantity);
      });
      break;
    }
    case Status.RETURNING: {
      if (invoice.status !== Status.DELIVERED) {
        throw InvalidStatus;
      }
      // If status is returning, update product sold
      invoice.InvoicesItem.forEach(async item => {
        return decreaseProductSold(item.productId, item.quantity);
      });
      break;
    }
    default:
      throw InvalidStatus;
  }

  return await prisma.invoice.update({
    where:{id},
    data:{
      status:{
        set: status as Status
      }
    },
    include:{
      address: true,
      InvoicesItem:{
        include:{
          Product:{
            include:{
              attachments: true,
              category: true,
              brand: true,
            }
          }
        }
      }
    }
  })
}

export async function getInvoiceById(id: string) {
  return await prisma.invoice.findUnique({
    where:{id},
    include:{
      address:true,
      InvoicesItem:{
        include:{
          Product:{
            include:{
              attachments: true,
              category: true,
              brand: true,
            }
          }
        }
      }
    }
  })
}

export default async function numberOfInvoices() {
  const res = await prisma.invoice.count();
  return res;
}