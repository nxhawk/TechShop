import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {AttachmentType} from '@prisma/client'

export async function createUser(name: string, phone: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');
  const user = await prisma.user.create({
    data: {
        name: name,
        phone: phone,
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