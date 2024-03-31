import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser } from '@/models/user';
import { Address } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import AddressForm, { Province } from '@/app/components/form/AddressForm';
import { provinceData } from '@/app/components/Constant';

export const metadata = {
  title: 'Địa chỉ | Tài khoản của tôi | TechWord',
  icons: '/images/logo.png',
};

async function getCurrentUser(userId: string) {
  const user = await getUser(userId);
  return user;
}

async function getDataProvince() {
  try {
    const res = await fetch('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
    const res1 = await res.json();
    return res1.data.data as Province[];
  } catch (error) {
    return provinceData;
  }
  
}

const Page = async() => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/auth/login');
  }else{
    try {
      const user = await getCurrentUser(session.user.id);
      const dataProvince = await getDataProvince();
      return(
        <>
          <div className='flex justify-between mb-2'>
            <p className='text-3xl'>Địa Chỉ Của Tôi</p>
            <AddressForm mode='add' dataProvince={dataProvince} />
          </div>
        </>
      )
    } catch (error) {
      redirect('/auth/login');
    }
  }
  return (
    <div>Page</div>
  )
}

export default Page