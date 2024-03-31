import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotEnoughQuantity, ProductNotFound } from '@/models/product';
import { UserNotFound } from '@/models/user';
import { createInvoice } from '@/models/invoice';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const { addressId, productId, quantity } = await request.json();
    const invoice = await createInvoice(session.user.id, addressId, productId, quantity);
    return NextResponse.json({ message: 'success'});
  } catch (error) {
    console.log('Error creating invoice', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json(
                    { message: 'Invalid addressId or productId' },
                    { status: 400 },
                );
            }
        }

        if (error === UserNotFound) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        if (error === ProductNotFound) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        if (error === NotEnoughQuantity) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
  }
}