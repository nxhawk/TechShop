import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { removeProductFromCart, changeProductQuantityInCart } from '@/models/cart';

export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: { id: string };
    },
) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
          return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
      }

      const { id } = params;
      if (!id) {
          return NextResponse.json({ message: 'Missing cartItemId' }, { status: 400 });
      }

      const { quantity } = await request.json();
      if (!quantity) {
          return NextResponse.json(
              {
                  message: 'Missing quantity',
              },
              { status: 400 },
          );
      }

      const cart = await changeProductQuantityInCart(id, quantity);

      return NextResponse.json({
          message: 'success',
          data: cart,
      });
    } catch (error) {
      console.log('Error changing product quantity from cart', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid CardItem Id' }, { status: 400 });
            }
            if (error.code === 'P2025') {
                return NextResponse.json({ message: 'CardItem not found' }, { status: 400 });
            }
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: 'Missing cartItemId' }, { status: 400 });
    }

    const cart = await removeProductFromCart(session.user.id, id);

    return NextResponse.json({
        message: 'success',
        data: cart,
    });

  } catch (error) {
        console.log('Error removing product from cart', getErrorMessage(error));

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid CardItem Id' }, { status: 400 });
            }
            if (error.code === 'P2017') {
                return NextResponse.json({ message: 'CardItem not found' }, { status: 400 });
            }
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
  }
}