import { toSlug } from '@/utils/helper';
import prisma from '../libs/prismadb';

export async function listBrands(){
  const brands =await prisma.brand.findMany({
    orderBy: {
      slug: 'asc'
    }
  })

  return brands;
}

export async function numberOfBrands() {
  const brands = await prisma.brand.count();
  return brands;
}

export async function createBrand(name: string){
  const newBrand = await prisma.brand.create({
    data:{
      name,
      slug: toSlug(name)
    }
  });

  return newBrand;
}

export async function getBrand(id: string) {
  const brand = await prisma.brand.findFirst({
      where: {
          id
      },
  });
  return brand;
}

export async function updateBrand(id: string, name: string) {
  const updatedBrand = await prisma.brand.update({
      where: {
          id
      },
      data: {
          name,
          slug: toSlug(name),
      },
  });
  return updatedBrand;
}

export async function deleteBrand(id: string) {
  const deletedBrand = await prisma.brand.delete({
      where: {
          id
      },
  });
  return deletedBrand;
}