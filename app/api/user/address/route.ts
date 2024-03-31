import { getErrorMessage } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createAddress, listAddresses } from '@/models/address';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const addresses = await listAddresses(session.user.id);
    return NextResponse.json({
        message: 'success',
        data: addresses,
    });

  } catch (error) {
    console.log('Error getting addresses of user', getErrorMessage(error));

    return NextResponse.json(
        { message: `Internal Server Error: ${getErrorMessage(error)}` },
        {
            status: 500,
        },
    );
  }
}