import { CartItem } from '@prisma/client';
import prisma from '../libs/prismadb';
import { UserNotFound } from './user';
import { NotEnoughQuantity, ProductNotFound } from './product';

export async function getCart(userId: string) {
  const cart = await prisma.cart.findFirst({
    where:{
      User:{
        id: userId,
      }
    },
    include:{
      CartItem:{
        include:{
          Product:{
            include:{
              attachments: true,
              category: true,
            }
          }
        }
      }
    }
  });

  if (!cart) {
    throw UserNotFound;
  }

  return cart;
}

export async function addProductToCart(userId: string, productId: string, quantity: number) {
  const product = await prisma.product.findUnique({
    where:{
      id: productId,
    }
  })

  if (!product) {
    throw ProductNotFound;
  }

  if (product.quantity < quantity) {
    throw NotEnoughQuantity;
  }

  const cart = await prisma.cart.findFirst({
    where:{
      User:{
        id: userId,
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

  if (!cart) {
    throw UserNotFound;
  }

  const cartItem = cart.CartItem.find(item => item.productId === productId);
  if (cartItem){
    const newQuantity = cartItem.quantity + quantity;
    if (product.quantity < newQuantity) {
      throw NotEnoughQuantity;
    }

    const updatedCartItem = await prisma.cartItem.update({
      where:{
        id: cartItem.id,
      },
      data:{
        quantity: newQuantity,
      },
      include:{
        Product:true
      }
    })

    return updatedCartItem;
  }

  const newCart = await prisma.cart.update({
    where:{
      id: cart.id,
    },
    data:{
      CartItem:{
        create:{
          quantity,
          Product:{
            connect:{
              id:productId
            }
          }
        }
      }
    },
    select:{
      CartItem:{
        include:{
          Product:true
        }
      }
    }
  })

  return newCart.CartItem.find(item => item.productId === productId);
}

export async function removeProductFromCart(userId: string, cartItemId: string) {
  const cartItem = await prisma.user.update({
    where:{
      id: userId,
    },
    data:{
      cart:{
        update:{
          CartItem:{
            delete:{
              id: cartItemId
            }
          }
        }
      }
    },
    select:{
      cart:{
        include:{
          CartItem:{
            include:{
              Product:true
            }
          }
        }
      }
    }
  })

  return cartItem.cart.CartItem.find(item => item.id === cartItemId);
}