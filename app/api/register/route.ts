import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, password } = await request.json();

    if (!name || !phone || !password) {
      return NextResponse.json(
          { message: 'Missing name, phone or password' },
          { status: 400 },
      );
    }

    return NextResponse.json({ message: 'success'});
  } catch (error) {
    
  }
}