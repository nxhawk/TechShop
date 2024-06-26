import Image from 'next/image';
import Link from 'next/link';
import { FullProduct } from '@/models/product';
import { CurrencyFormatter } from '@/utils/formatter';

interface Props {
  product: FullProduct;
}

const ProductCard = ({ product }: Props) => {
  const numberOfReviews = product.Reviews.length;
  const rating = numberOfReviews
    ? product.Reviews.reduce((a, b) => a + b.rating, 0) / numberOfReviews
    : 0;
  return (
    <div className='pb-6 w-full' style={{ maxWidth: '220px' }}>
      <Link
        href={`/product/${product.slug}`}
        className='block hover:-translate-y-0.5 ease-out transition duration-30'
      >
        <div className='max-w-md mx-auto'>
          <div className='bg-white shadow-md border border-cagray-200 rounded-lg max-w-xs'>
            <div className='h-40 flex flex-col w-full  justify-center'>
              <Image
                className='rounded-t-lg overflow-hidden'
                alt={product.name}
                src={
                  product.attachments[0]?.path ??
                  '/images/Image_not_available.png'
                }
                width={400}
                height={200}
              />
            </div>
            <div className='p-5'>
              <div>
                <h5 className='text-gray-900 font-bold text-base tracking-tight mb-2 line-clamp-2 h-12'>
                  {product.name}
                  <br/>
                </h5>
              </div>
              <div className='font-light'>
                <span className='font-normal line-through text-sm'>
                    {CurrencyFormatter.format(product.price)}
                </span>{' '}
                -{Math.floor(product.sale * 100)}%
              </div>
              <div className='text-amber-500 font-bold text-md'>
                  {CurrencyFormatter.format(
                      Math.round(product.price * (1 - product.sale)),
                  )}
              </div>
              <div className='text-sm'>Đã bán {product.sold}</div>
              <div className='flex flex-row  w-28 items-center justify-between text-sm mt-2'>
                <i
                    className={
                        'bi text-amber-500 ' +
                        (rating > 0.5 ? 'bi-star-fill' : 'bi-star')
                    }
                ></i>
                <i
                    className={
                        'bi text-amber-500 ' +
                        (rating > 1.5 ? 'bi-star-fill' : 'bi-star')
                    }
                ></i>
                <i
                    className={
                        'bi text-amber-500 ' +
                        (rating > 2.5 ? 'bi-star-fill' : 'bi-star')
                    }
                ></i>
                <i
                    className={
                        'bi text-amber-500 ' +
                        (rating > 3.5 ? 'bi-star-fill' : 'bi-star')
                    }
                ></i>
                <i
                    className={
                        'bi text-amber-500 ' +
                        (rating > 4.5 ? 'bi-star-fill' : 'bi-star')
                    }
                ></i>
                <div className='text-md font-normal'>{numberOfReviews}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard