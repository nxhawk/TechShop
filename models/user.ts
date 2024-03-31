import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {
  AttachmentType,
  Product,
  CartItem,
  Attachment,
  Category,
  User,
  Address
} from "@prisma/client"
import prisma from '../libs/prismadb';
import { createAttachment, deleteAttachment } from './attachment';

export type FullCartItem = CartItem & {
  Product: Product & {
      attachments: Attachment[];
      category: Category | null;
  };
};

export type UserWithAddresses = User & {
  addresses: Address[];
};

export type UserWithImage = User & {
  image: Attachment | null;
};

export const UserNotFound = new Error('User does not exist');
export const InvalidCredentials = new Error('Invalid Credentials');
export const PhoneAlreadyExists = new Error('Phone number already exists');
export const Unauthorized = new Error('Unauthorized');

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where:{
      id: userId,
    },
    include:{
      addresses:true,
      image:true,
    }
  })

  if (!user){
    throw UserNotFound
  }

  return user;
}

export async function createUser(name: string, phone: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');
  const user = await prisma.user.create({
    data: {
        name,
        phone,
        password: hashedPassword,
        image: {
            create: {
                name: hashedPhone,
                path: `https://robohash.org/${hashedPhone}.png?set=set4`,
                type: AttachmentType.IMAGE,
            },
        },
        cart: {
            create: {},
        },
    },
  });
  return user;
}

export async function updateUser(
  id: string,
  name: string,
  phone: string,
  email: string,
  image: string,
){

  const user = await prisma.user.findUnique({
    where:{id},
    include:{
      image:true
    }
  })

  if (!user){
    throw UserNotFound;
  }

  const u = await prisma.user.findFirst({
    where:{
      phone,
      id:{
        not:id,
      }
    }
  });

  if (u){
    throw PhoneAlreadyExists;
  }

  let userImage: Attachment | null = user.image;
  if (userImage?.path !== image){
    if (userImage){
      deleteAttachment(userImage?.id)
    }

    userImage = await createAttachment(image, AttachmentType.IMAGE);
  }

  const newUser = await prisma.user.update({
    where:{id},
    data:{
      name,
      phone,
      email,
      image:{
        connect:{
          id:userImage?.id
        }
      }
    },
    include:{
      image:true
    }
  })

  return newUser;
}

export async function auth(phone: string, password: string){
  const user = await prisma.user.findUnique({
    where: {
        phone: phone,
    },
    include: {
        image: true,
    },
  });

  if (!user || !user?.password) {
    throw InvalidCredentials;
  }

  const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw InvalidCredentials;
    }

  return user;
}

export async function numberOfUsers() {
  const users = await prisma.user.count();
  return users;
}

export async function listUsers(page: number, perPage: number) {
  const users = await prisma.user.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    include:{
      addresses: true,
      image: true
    }
  })

  return users;
}

export async function removeUser(id: string) {
  await prisma.user.delete({
    where: {
      id
    }
  })
  await prisma.address.deleteMany({
    where: {
        userId: id,
    },
  });
}

export async function updateAdminRight(id: string) {
  const user = await prisma.user.findUnique({
    where:{
      id
    }
  })

  if (!user) {
    throw UserNotFound;
  }

  const newUser = await prisma.user.update({
    where: {id},
    data:{
      role: user.role === 'ADMIN' ? 'USER' : "ADMIN"
    }
  })

  return newUser
}

export async function changePassword(id: string, password: string, newPassword: string) {
  const user = await prisma.user.findUnique({
    where:{
      id
    }
  });

  if (!user){
    throw UserNotFound;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match){
    throw InvalidCredentials;
  }

  const hashedPassword= await bcrypt.hash(newPassword,10);
  const res = await prisma.user.update({
    where:{
      id
    },
    data:{
      password: hashedPassword
    }
  });

  return res;
}