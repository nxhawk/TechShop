import { listCarousel } from '@/models/carousel';
import {listCat} from '@/models/slides';

import BgCarousel from '../components/carousel/BgCarousel';
import Carousel from '../components/carousel/Carousel';
import FeaturedCategory from '../components/featuredCategory/FeaturedCategory';
import PromotionBox from '../components/promotionBox/PromotionBox';
import Trending from '../components/trending/Trending';

export const metadata = {
  title: 'TechWord - Điện thoại, Laptop, PC, Đồng hồ, Phụ kiện chính hãng',
  icons: '/images/logo.png',
};

const Page = async () => {
  const mainCarousels = await listCarousel(true);
  const smallCarousels = await listCarousel(false);
  return (
    <>
      <div className='w-full h-full mb-0 group'>
        <BgCarousel slides={mainCarousels}/>
      </div>
      <Carousel slides={smallCarousels} />
      <FeaturedCategory list={listCat} />
      <PromotionBox
        banner={'/images/banner/knockout-desk-1200x120.webp'}
        bg={'bg-orange-200'}
        categorySlug='dien-thoai'
      />
      <PromotionBox
          banner={'/images/banner/unnamed.webp'}
          bg={'bg-blue-200'}
          categorySlug='laptop'
      />
      <Trending />
    </>
  )
}

export default Page