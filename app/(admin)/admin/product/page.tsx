
import AllProduct from '@/app/components/admin/product/AllProduct';
import React from 'react'
import { numberOfProducts } from '@/models/product';

export const metadata = {
  title: 'Quản lý sản phẩm | Admin site | TechWorld',
  icons: '/images/logo.png',
};

const Page = async ({searchParams}:{
  params:{slug:string},
  searchParams?: {[key: string]: string |string[]|undefined},
}) => {
  const page = searchParams?.page ? decodeURI(searchParams?.page as string) : undefined;
  const categorySlug = searchParams?.category
    ? decodeURI(searchParams?.category as string)
    : undefined;
  const sortingOption = searchParams?.sort ? decodeURI(searchParams?.sort as string) : undefined;
  const perPage = 8;
  const totalProducts = await numberOfProducts(categorySlug);
  return (
    <div className='w-full'>
      <AllProduct
        page={parseInt(page || '1')}
        perPage={perPage}
        totalProducts={totalProducts}
        categorySlug={categorySlug}
        option={sortingOption}
      />
    </div>
  )
}

export default Page