import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import HeaderSearchBar from './HeaderSearchBar';
import CartHover from './CartHover';
import UserButtons from './UserButtons';
import Notification from './Notification';
import CollapsingCategory from './CollapsingCategory';

const Header = () => {
  return (
    <nav className='bg-amber-400 border-none dark:bg-gray-900 grid grid-rows-2 gap-0'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pt-4 pb-2'>
        <Link href='/' className='flex items-center me-6'>
          <Image
              src='/images/logo.png'
              className='h-8 mr-3 w-8'
              alt='TechWorld Logo'
              width={1000}
              height={1000}
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            TechWorld
          </span>
        </Link>
        <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
        >
            <span className='sr-only'>Open main menu</span>
            <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                ></path>
            </svg>
        </button>

        <HeaderSearchBar/>

        <div className='hidden w-full md:block md:w-auto ms-4' id='navbar-default'>
          <ul className='flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Notification/>
              </li>
              <li>
                <CartHover/>
              </li>
              <UserButtons/>
          </ul>
        </div>
      </div>

      <div className='max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-0'>
      <ul className='flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                    <li>
                        <Link
                            href='/category/dien-thoai'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-phone' style={{ fontSize: 20 }}></i> Điện thoại
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/laptop'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-laptop' style={{ fontSize: 20 }}></i> Laptop
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/tablet'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-tablet' style={{ fontSize: 20 }}></i> Tablet
                        </Link>
                    </li>
                    <li>
                        <CollapsingCategory/>
                    </li>
                    <li>
                        <Link
                            href='/category/smartwatch'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-smartwatch' style={{ fontSize: 20 }}></i> Smartwatch
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/dong-ho'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-watch' style={{ fontSize: 20 }}></i> Đồng hồ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/may-cu-gia-re'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-phone-fill' style={{ fontSize: 20 }}></i> Máy cũ giá
                            rẻ
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/pc'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-pc-display' style={{ fontSize: 20 }}></i> PC
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/may-in'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-printer' style={{ fontSize: 20 }}></i> Máy in
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/category/dien-gia-dung'
                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                        >
                            <i className='bi bi-fan' style={{ fontSize: 20 }}></i> Điện gia dụng
                        </Link>
                    </li>
                </ul>
      </div>
    </nav>
  )
}

export default Header