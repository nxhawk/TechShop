'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import CollapsableSidebarItem from './CollapsableSidebarItem';
import CollapsableSidebarCarousel from './CollapsableSidebarCarousel ';

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className='w-1/4 flex flex-col justify-start items-center mr-10 min-h-screen'>
      <div className='bg-white w-full h-full flex flex-col px-5 py-5 space-y-3 shadow-lg'>
        <div className='flex items-center space-x-5'>
          <Image
            alt='logo'
            className='w-20 h-20'
            src='/images/logo.png'
            width={1000}
            height={1000}
          />
          <p className='font-bold text-md sm:text-md md:text-lg'>TechWorld Admin</p>
        </div>
        <Link
          href='/admin'
          className={`${
            pathName=='/admin'? 'bg-gray-200' : 'hover:bg-gray-200'
          } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer`}
        >
          <i className='bi bi-journals'></i>
          <p className='text-md'>Dashboard</p>
        </Link>
        <Link
          href='/admin/category'
          className={`${
              pathName.includes('/admin/category') ? 'bg-gray-200' : 'hover:bg-gray-200'
          } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer `}
        >
            <i className='bi bi-tags-fill'></i>
            <p className='text-md'>Danh mục</p>
        </Link>
        <Link
            href='/admin/brand'
            className={`${
                pathName.includes('/admin/brand') ? 'bg-gray-200' : 'hover:bg-gray-200'
            } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer `}
        >
            <i className='bi bi-apple'></i>
            <p className='text-md'>Thương hiệu</p>
        </Link>
        <CollapsableSidebarItem/>
        <Link
            href='/admin/order'
            className={`${
                pathName.includes('/admin/order') ? 'bg-gray-200' : 'hover:bg-gray-200'
            } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer `}
        >
            <i className='bi bi-cart'></i>
            <p className='text-md'>Đơn hàng</p>
        </Link>
        <Link
            href='/admin/review'
            className={`${
                pathName.includes('/admin/review') ? 'bg-gray-200' : 'hover:bg-gray-200'
            } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer`}
        >
            <i className='bi bi-star'></i>
            <p className='text-md'>Đánh giá</p>
        </Link>
        <Link
            href='/admin/user'
            className={`${
                pathName.includes('/admin/user') ? 'bg-gray-200' : 'hover:bg-gray-200'
            } rounded-xl flex py-3 px-3 space-x-3 cursor-pointer`}
        >
            <i className='bi bi-people'></i>
            <p className='text-md'>Khách hàng</p>
        </Link>
        <CollapsableSidebarCarousel/>
        <Link
            href='/'
            className={
                'hover:bg-gray-200 rounded-xl flex py-3 px-3 space-x-3 cursor-pointer'
            }
        >
            <i className='bi bi-arrow-return-left'></i>
            <p className='text-md'>Quay lại trang web</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar