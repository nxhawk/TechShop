import prisma from '../libs/prismadb';
import { toSlug } from '@/utils/helper';

export async function createCategory(name: string) {
  const newCategory = await prisma.category.create({
    data: { 
      name,
      slug: toSlug(name)
    }
  })

  return newCategory;
}

export async function updateCategory(id: string, name: string){
  const updatedCategory = await prisma.category.update({
    where:{
      id
    },
    data:{
      name,
      slug: toSlug(name)
    }
  })
  return updatedCategory;
}