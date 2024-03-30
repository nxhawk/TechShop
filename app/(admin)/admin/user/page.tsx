import { numberOfUsers } from '@/models/user';
import UserList from '@/app/components/admin/user/UserList';

export const metadata = {
  title: 'Quản lý người dùng | Admin site | TechWorld',
  icons: '/images/logo.png',
};

export const revalidate = 0;

const Page = async() => {
  const perPage = 10;
  const totalUser = await numberOfUsers();
  return (
    <div className='w-full'>
      <UserList perPage={perPage} totalUsers={totalUser} page={1} />
    </div>
  )
}

export default Page