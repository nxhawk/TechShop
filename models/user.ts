import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {AttachmentType} from "@prisma/client"
import prisma from '../libs/prismadb';


export const UserNotFound = new Error('User does not exist');
export const InvalidCredentials = new Error('Invalid Credentials');
export const PhoneAlreadyExists = new Error('Phone number already exists');
export const Unauthorized = new Error('Unauthorized');

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