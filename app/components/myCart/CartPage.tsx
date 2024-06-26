'use client';
import React from 'react';
import { useGlobalContext } from '@/app/context/GlobalContext';
import Button from '../widgets/button/Button';
import Image from 'next/image';
import Link from 'next/link';
import MyCart from './MyCart';
import CartInformation from './CartInformation' 

const CartPage = () => {
  const { myCart } = useGlobalContext();

  if (myCart == null || myCart?.CartItem.length == 0) {
    return (
      <div className='h-fit w-full my-32 flex flex-col items-center justify-center'>
        {' '}
        <Image
            src={'/images/empty_cart.png'}
            width={200}
            height={200}
            alt='Empty cart'
            className={'mb-4'}
        />
        <h1>Không có sản phẩm nào trong giỏ hàng. Bắt đầu mua sắm thôi nào !</h1>
        <Link href='/'>
            <Button className='bg-amber-400 px-20 py-3 mt-4 hover:bg-amber-300'>
                Về trang chính
            </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex my-4'>
      <div className='w-2/3  block'>
        <MyCart />
      </div>
      <div className='w-1/3 ml-4 bg-white rounded-sm p-4'>
        <CartInformation />
      </div>
    </div>
  )
}

export default CartPage