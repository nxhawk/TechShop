import AddCarousel from '@/app/components/admin/carousel/AddCarousel';

export const metadata = {
  title: 'Thêm ảnh bìa trang chủ | Admin site | TechWorld',
  icons: '/images/logo.png',
};


const Page = () => {
  return (
    <div className='w-full'>
      <AddCarousel />
    </div>
  )
}

export default Page