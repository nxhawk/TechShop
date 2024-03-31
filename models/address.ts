import prisma from '../libs/prismadb';

export async function listAddresses(userId?: string) {
  const addresses = await prisma.address.findMany({
      where: {
          userId
      },
  });

  return addresses;
}

export async function createAddress(
  userId: string,
  name: string,
  phone: string,
  area: string,
  address: string,
){
  const addressData = await prisma.address.create({
    data: {
        name,
        phone,
        area,
        address,
        User: {
            connect: {
                id: userId,
            },
        },
    },
  });

  return addressData;
}