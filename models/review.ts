import prisma from '@/libs/prismadb';
import { Attachment, Brand, Category, Review, Status } from '@prisma/client';
import { Unauthorized } from './user';

export type FullReview = Review & {
  User: {
      id: string;
      name: string | null;
      email: string | null;
      image: Attachment | null;
  };
};

export type FullReviewWithProduct = Review & {
  Product: {
      id: string;
      slug: string;
      name: string;
      attachments: Attachment[];
      category: Category | null;
      brand: Brand | null;
  };
  User: {
      id: string;
      name: string | null;
      image: Attachment | null;
      phone: string;
  };
};

export const ReviewNotFound = new Error('Review not found');

export async function listReviews(
  userId?: string,
  keyword?: string,
  star?: number,
  page?: number,
  perPage?: number,
){
  const res= await prisma.review.findMany({
    take:perPage,
    skip:page!=undefined && perPage!=undefined ?(page-1)*perPage:0,
    where:{
      rating:star,
      userId:userId,
      OR:[
        {
          comment:{
            contains:keyword,
            mode:'insensitive'
          }
        },
        {
          User:{
            OR:[
              {
                name:{
                  contains:keyword,
                  mode: 'insensitive',
                }
              },
              {
                phone:{
                  contains:keyword,
                  mode: 'insensitive',
                }
              }
            ]
          },
          Product:{
            name:{
              contains: keyword,
              mode: 'insensitive',
            }
          }
        }
      ]
    },
    include:{
      Product:{
        select:{
          id: true,
          slug: true,
          name: true,
          attachments: true,
          category: true,
          brand: true,
        }
      },
      User:{
        select: {
          id: true,
          name: true,
          image: true,
          phone: true,
        },
      }
    }
  })

  return res;
}

export async function getReviewByProductId(id: string) {
  const review = await prisma.review.findMany({
    where:{
      productId: id,
    },
    include:{
      User:{
        select:{
          name: true,
          image: true,
          phone: true,
        }
      }
    }
  })

  return review;
}
