import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InvoiceNotDelivered, InvoiceNotFound } from '@/models/invoice';
import { createReview, listReviews } from '@/models/review';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const { invoiceItemId, rating, message } = await request.json();
    if (!invoiceItemId || !rating ) {
        return NextResponse.json(
            { message: 'Missing invoiceItemId, or rating' },
            { status: 400 },
        );
    }

    const review = await createReview(session.user.id, invoiceItemId, rating, message);
    return NextResponse.json({ message: 'success', data: review });
  } catch (error) {
    console.log('Error creating review', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2023') {
                return NextResponse.json({ message: 'Invalid invoiceItemId' }, { status: 400 });
            }
        }

        if (error === InvoiceNotFound) {
            return NextResponse.json({ message: `${getErrorMessage(error)}` }, { status: 400 });
        }

        if (error === InvoiceNotDelivered) {
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