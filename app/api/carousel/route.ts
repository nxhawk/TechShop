import { createCarousel } from '@/models/carousel';
import { getErrorMessage } from '@/utils/helper';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, main, attachments } = await request.json();
    if (!url || !attachments) {
      return NextResponse.json(
          {
              message: 'Missing url, main or attachments',
          },
          { status: 400 },
      );
    }
    if(main){
      const carousel = await createCarousel(attachments, url, true);
      return NextResponse.json({ message: 'success', data: carousel });
    }else{
      const carousel = await createCarousel(attachments, url, false);
      return NextResponse.json({ message: 'success', data: carousel });
    }
  } catch (error) {
    console.log('Error creating carousel', getErrorMessage(error));

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: `Invalid JSON: ${getErrorMessage(error)}` },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: `Internal Server Error: ${getErrorMessage(error)}` },
            {
                status: 500,
            },
        );
  }
}