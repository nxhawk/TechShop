import AllCategory from '@/app/components/admin/category/AllCategory';
import React from 'react'

export const metadata = {
  title: 'Quản lý danh mục | Admin site | TechWorld',
  icons: '/images/logo.png',
};

const Page = () => {
  return (
    <div className='w-full'>
      <AllCategory role='ADMIN'/>
    </div>
  )
}

export default Page