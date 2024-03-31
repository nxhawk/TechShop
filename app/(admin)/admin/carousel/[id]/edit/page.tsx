import { FullCarousel, getCarousel } from '@/models/carousel';
import EditCarousel from '@/app/components/admin/carousel/EditCarousel';

export const metadata = {
  title: 'Chỉnh sửa ảnh bìa | Admin site | TechWorld',
  icons: '/images/logo.png',
};


const Page = async({ params }: { params: { id: string } }) => {
  const carousel = await getCarousel(params.id);
  return (
    <div className='w-full'>
      <EditCarousel carousels={carousel as FullCarousel} />
    </div>
  )
}

export default Page