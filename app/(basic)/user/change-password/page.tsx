import ChangePassword from '@/app/components/form/ChangePassword';

export const metadata = {
  title: 'Thay đổi mật khẩu | Tài khoản của tôi | TechWord',
  icons: '/images/logo.png',
};

const Page = () => {
  return (
    <>
      <p className='text-3xl'>Đổi mật khẩu</p>
      <p className='text-black-300'>Thiết lập mật khẩu mạnh để bảo vệ tài khoản của bạn</p>
      <hr className='mt-2 mb-4'></hr>
      <ChangePassword />
    </>
  )
}

export default Page