import { Attachment, AttachmentType, Carousel } from '@prisma/client';
import prisma from '../libs/prismadb';
import { createAttachment, deleteAttachment } from './attachment';

export type FullCarousel = Carousel & {
  image: Attachment | null;
};

export async function listCarousel(main?: boolean){
  const res = await prisma.carousel.findMany({
    where:{
      main:{equals: main}
    },
    include:{
      image:true
    }
  })
  return res;
} 

export async function getCarousel(id: string) {
  const res = await prisma.carousel.findFirst({
    where:{id},
    include:{
      image:true,
    }
  })

  return res;
}

export async function createCarousel(image: string, url: string, main: boolean) {
  const carouselImg = await createAttachment(image, AttachmentType.IMAGE);
  const res = await prisma.carousel.create({
    data:{
      url,
      main,
      image:{
        connect:{
          id: carouselImg.id,
        }
      }
    }
  }) 
  return res;
}

export async function updateCarousel(id: string, image: string, url: string, main: boolean) {
  const carousel = await prisma.carousel.findUnique({
    where:{id},include:{image:true}
  })
  if (!carousel) {
    throw new Error('Carousel does not exist');
  }

  let carouselImage: Attachment | null = carousel.image;
  if (carouselImage?.path !== image) {
    if (carouselImage) {
      deleteAttachment(carouselImage?.id);
    }
    carouselImage = await createAttachment(image, AttachmentType.IMAGE);
  }

  const newCarousel = await prisma.carousel.update({
    where:{
      id
    },
    data:{
      url,
      main,
      image:{
        connect:{
          id:carouselImage?.id
        }
      }
    },
    include:{
      image:true,
    }
  })

  return newCarousel;
}