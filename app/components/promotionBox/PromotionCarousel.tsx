'use client';

import { Carousel } from 'react-responsive-carousel';
import { FullProduct } from '@/models/product';
import ProductCard from '../product/ProductCard';

const PromotionCarousel = ({
  productsSlide,
}: {
  productsSlide: Array<Array<FullProduct>>;
}) => {
  return (
    <>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        showIndicators={false}
        showStatus={false}
      >
        {
          productsSlide.map((data, index)=>(
            <div key={index} className='flex mt-2 justify-around px-4'>
              {
                data.map(product=>(
                  <div key={product.id} className='max-w-fit'>
                    <ProductCard product={product} />
                  </div>
                ))
              }
            </div>
          ))
        }
      </Carousel>
    </>
  )
}

export default PromotionCarousel