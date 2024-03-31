import prisma from '@/libs/prismadb';
import {
    NotEnoughQuantity,
    ProductNotFound,
    decreaseProductQuantity
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