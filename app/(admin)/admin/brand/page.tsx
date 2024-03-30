import AllBrand from '@/app/components/admin/brand/AllBrand';
import React from 'react'

export const metadata = {
  title: 'Quản lý thương hiệu | Admin site | TechWorld',
  icons: '/images/logo.png',
};

const Page = () => {
  return (
    <div className='w-full'>
      <AllBrand/>
    </div>
  )
}

export default Page