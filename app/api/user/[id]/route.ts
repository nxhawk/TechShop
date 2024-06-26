import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

import { removeUser, updateAdminRight } from '@/models/user';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }
    if (session.user.id === id) {
      return NextResponse.json(
          { message: 'Không thể tự bản thân' },
          { status: 400 },
      );
    }

    const user = await removeUser(id);
    return NextResponse.json({ message: 'success', data: user });
  } catch (error) {
    console.log('Error deleting user', getErrorMessage(error));

    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2023') {
            return NextResponse.json({ message: 'Invalid user id' }, { status: 400 });
        }
        if (error.code === 'P2025') {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }

    if (session.user.id === id) {
      return NextResponse.json(
          { message: 'Không thể tự xóa quyền Quản trị viên của bản thân' },
          { status: 400 },
      );
    }

    const user = await updateAdminRight(id);
    return NextResponse.json({ message: 'success', data: user });
  } catch (error) {
    console.log('Error updating user', getErrorMessage(error));

    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2023') {
            return NextResponse.json({ message: 'Invalid user id' }, { status: 400 });
        }
        if (error.code === 'P2025') {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
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