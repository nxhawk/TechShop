'use client';
import React, { useEffect, useState } from 'react';
import Button from '../widgets/button/Button';
import ListProduct from './ListProduct';
import { FullProduct } from '@/models/product';
import { CurrencyFormatter, RatingFormatter } from '@/utils/formatter';
import { defaultValue } from '../Constant';
import { Block, Loading, Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CarouselThumbnail from './CarouselThumbnail';
import { useGlobalContext } from '@/app/context/GlobalContext';

import InputQuantity from '../widgets/inputQuantity/InputQuantity';

interface Props {
  product: FullProduct;
  similarProducts: Array<FullProduct>;
}

const perPage = 10;

const ProductDetail = ({ product, similarProducts }: Props) => {
  const router = useRouter();
  const { user, updateMyCart } = useGlobalContext();
  const [imgSelect, setImgSelect] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(1);

  async function addToCart() {
    if (user == null) {
      router.replace('/auth/login');
      return;
    }
    Loading.dots();
    try {
      const data = {
        userId: user?.id,
        productId: product.id,
        quantity: quantity,
      };
  
      await fetch('/api/user/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      await updateMyCart?.();
      Notify.info('Thêm sản phẩm vào giỏ hàng thành công', {
        position: 'center-center',
        timeout: 2000,
        clickToClose: true,
        width: '450px',
        fontSize: '20px',
      });
    } catch (error) {
      Notify.failure("An error occurred");
    }
    Loading.remove();
  }

  async function buyNow() {
    await addToCart();
    router.push('/cart');
  }

  const numberOfReviews = product.Reviews.length;
  const rating = numberOfReviews
    ? product.Reviews.reduce((a, b) => a + b.rating, 0) / numberOfReviews
    : 0;
  return (
    <>
      <div className='p-4 bg-slate-50 flex flex-row'>
        <div className='flex flex-col'>
          <div className='mb-4' style={{height:"450px"}}>
            <Image
              alt="Image"
              src={product?.attachments[imgSelect]?.path ?? defaultValue.image}
              width={400}
              height={400}
              quality={100}
              style={{ width: '450px', height: '450px', objectFit: 'contain' }}
            />
          </div>

          <div className='flex items-center justify-center mb-4'>
            <CarouselThumbnail
              attachments={product.attachments}
              imgSelect={imgSelect}
              setImgSelect={setImgSelect}
            />
          </div>
        </div>

        <div className='flex-1 ml-8'>
          <h2 className='font-semibold text-2xl tracking-wider '>{product.name}</h2>
          <div className='flex text-lg my-2'>
            <span className='text-amber-600 font-bold text-base mr-2 border-amber-600 border-b'>
                {RatingFormatter.format(rating)}
            </span>
            <div className='text-amber-500 w-28 flex flex-row justify-between'>
              <i className={'bi ' + (rating > 0.5 ? 'bi-star-fill' : 'bi-star')}></i>
              <i className={'bi ' + (rating > 1.5 ? 'bi-star-fill' : 'bi-star')}></i>
              <i className={'bi ' + (rating > 2.5 ? 'bi-star-fill' : 'bi-star')}></i>
              <i className={'bi ' + (rating > 3.5 ? 'bi-star-fill' : 'bi-star')}></i>
              <i className={'bi ' + (rating > 4.5 ? 'bi-star-fill' : 'bi-star')}></i>
            </div>
            <span className='mx-4 font-sans text-gray-300 text-2xl relative -top-1'>
                |
            </span>
            <p className='font-normal text-lg text-gray-500'>
              <span className='text-black font-semibold text-xl mr-2 border-black border-b'>
                  {numberOfReviews}
              </span>
              Đánh giá
            </p>
            <span className='mx-4 font-sans text-gray-300 text-2xl relative -top-1'>
                |
            </span>
            <p className='font-normal text-lg text-gray-500'>
                <span className='text-black font-semibold text-xl mr-2'>
                    {product.sold}
                </span>
                Đã bán
            </p>
          </div>
          <div className='p-6 flex bg-gray-100 items-center'>
            {product.sale != 0 &&(
              <div className='line-through text-gray-500 text-lg mr-6'>
                {CurrencyFormatter.format(product.price)}
              </div>
            )}
            <div className='text-amber-600 text-3xl font-semibold mr-6'>
                {CurrencyFormatter.format(product.price * (1 - product.sale))}
            </div>
            {product.sale != 0 && (
                <div className='inline-block bg-amber-500 text-white text-sm rounded-sm uppercase font-bold text-center px-1 py-0'>
                    {Math.floor(product.sale * 100)}% giảm
                </div>
            )}
          </div>
          <div className='flex mt-12 items-center'>
            <InputQuantity
                label='Số lượng'
                quantity={quantity}
                setQuantity={setQuantity}
                max={product.quantity}
            />
            <div className='ml-8 text-gray-600'>{product.quantity} sản phẩm có sẵn</div>
          </div>
          <div className='flex items-center mt-12'>
            {product.quantity == 0 ? (
              <Button
                disable
                className='border-amber-600 px-4 py-3 font-normal mr-8 w-full text-amber-800 bg-amber-100'
              >
                <div className='text-xl'>Sản phẩm đã hết hàng</div>
              </Button>
            ):(
              <>
                <Button
                onClick={addToCart}
                className='border-amber-600 px-4 py-3 font-normal mr-8 flex flex-row items-center text-amber-800 bg-amber-100 hover:bg-amber-50'
                >
                  <i className='bi bi-cart-plus text-xl pr-2'></i>
                  <div className='text-xl'>Thêm Vào Giỏ Hàng</div>
                </Button>
                <Button
                    onClick={buyNow}
                    className='border-amber-600 px-4 py-3 mr-8 flex flex-row items-center text-white bg-amber-600 hover:bg-amber-500'
                >
                    <div className='text-xl'>Mua Ngay</div>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='p-4 bg-slate-50 mt-6'>
          <div className='w-full mb-5 bg-gray-100 uppercase text-xl tracking-wider font-medium px-2 py-4 '>
              Mô tả sản phẩm
          </div>
          <p className='px-6 pb-6 whitespace-pre-line'>{product.description}</p>
      </div>

      {/* Review */}
      <div className='p-4 bg-slate-50 mt-6'>
        <div className='w-full mb-5 bg-gray-100 uppercase text-xl tracking-wider font-medium px-2 py-4 '>
            Đánh giá sản phẩm
        </div>
        <div className='flex flex-row px-5 py-8 border border-amber-300 bg-amber-50'>
          <div className='flex flex-col items-center justify-center w-40 text-amber-600 text-xl font-medium'>
            <div className='mb-5'>
                <span className='tracking-wide text-3xl '>{rating}</span> trên 5
            </div>
            <div className='flex flex-row w-32 items-center justify-between text-2xl'>
                <i className={'bi ' + (rating > 0.5 ? 'bi-star-fill' : 'bi-star')}></i>
                <i className={'bi ' + (rating > 1.5 ? 'bi-star-fill' : 'bi-star')}></i>
                <i className={'bi ' + (rating > 2.5 ? 'bi-star-fill' : 'bi-star')}></i>
                <i className={'bi ' + (rating > 3.5 ? 'bi-star-fill' : 'bi-star')}></i>
                <i className={'bi ' + (rating > 4.5 ? 'bi-star-fill' : 'bi-star')}></i>
            </div>
          </div>
          <div className='ml-8'>

          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail