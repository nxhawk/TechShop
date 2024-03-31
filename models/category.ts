import prisma from '../libs/prismadb';
import { toSlug } from '@/utils/helper';

export async function listCategories(){
  const categories = await prisma.category.findMany();
  return categories
}

export async function listCategoriesAlphabet() {
  const categories = await prisma.category.findMany({
    orderBy:{
      slug:'asc'
    }
  })
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
      where: {
          slug: slug,
      },
  });
  return category;
}

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

export async function deleteCategory(id: string) {
  const deteledCategory = await prisma.category.delete({
    where:{
      id
    }
  })

  return deteledCategory;
}