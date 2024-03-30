import { Attachment, AttachmentType } from '@prisma/client';
import prisma from '../libs/prismadb';
import cloudinary from '@/libs/cloudinary';

export async function createAttachment(data: string, type: AttachmentType) {
  try {
    const res = await cloudinary.v2.uploader.upload(data, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    })
    const attachment = await prisma.attachment.create({
      data: {
        name: res.public_id,
        type: type,
        path: res.secure_url,
      },
    })
  
    return attachment;
  } catch (error) {
    console.log(error);
    throw new Error("attachment ERRor");
  }
  


  
}

export async function createAttachments(attachments: string[]) {
  return await Promise.all(
    attachments.map(attachment=>{
      return createAttachment(attachment, AttachmentType.IMAGE);
    })
  )
}