import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { Unauthorized } from '@/models/user';
import { ReviewNotFound, deleteReview} from '@/models/review';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const review = await deleteReview(id, session.user.id);
    return NextResponse.json({ message: 'success', data: review });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2023') {
          return NextResponse.json({ message: 'Invalid review id' }, { status: 400 });
      }
      if (error.code === 'P2025') {
          return NextResponse.json({ message: 'Review not found' }, { status: 400 });
      }
  }

  if (error === ReviewNotFound) {
      return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
  }

  if (error === Unauthorized) {
      return NextResponse.json({ message: getErrorMessage(error) }, { status: 400 });
  }

  return NextResponse.json(
      { message: `Internal Server Error: ${getErrorMessage(error)}` },
      {
          status: 500,
      },
  );
  }
}