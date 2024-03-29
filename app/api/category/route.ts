import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createCategory } from '@/models/category';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: 'Missing name' }, { status: 400 });
    }
    const category = await createCategory(name);
    return NextResponse.json({ message: 'success', data: category });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
          { message: `Invalid JSON: ${getErrorMessage(error)}` },
          { status: 400 },
      );
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
          return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
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