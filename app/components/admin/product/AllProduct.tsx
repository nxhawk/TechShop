import React from 'react'
import ProductSearchBar from './ProductSearchBar';
import SelectCategory from './SelectCategory';
import { listCategoriesAlphabet } from '@/models/category';
import { listProductsForPagination } from '@/models/product';
import SelectSortOption from './SelectSortOption';
import ProductCardAdmin from './ProductCardAdmin';
import Link from 'next/link';

interface Props {
  totalProducts: number;
  perPage: number;
  page: number;
  categorySlug?: string;
  option?: string;
}

const AllProduct = async(props: Props) => {
  const products = await listProductsForPagination(
    props.page,
    props.perPage,
    props.categorySlug,
    undefined,
    props.option,
  );
  const categories = await listCategoriesAlphabet();
  return (
    <div className='space-y-5 flex flex-col justify-start my-5'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                  Quản lý sản phẩm
              </h2>
              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
                  {props.totalProducts} sản phẩm
              </span>
          </div>
        </div>
      </div>

      <ProductSearchBar/>

      <div className='flex justify-end space-x-5'>
        <SelectCategory
            categories={categories}
            slug={props.categorySlug}
            sortingOption={props.option}
            isSearching={false}
        />
        <SelectSortOption
            category={props.categorySlug}
            option={props.option}
            isSearching={false}
        />
      </div>
      <div className='grid grid-cols-4 gap-10'>
          {products.map(product => (
              <ProductCardAdmin
                  key={product.id}
                  product={product}
                  className='w-full h-fit px-2 py-2 text-sm'
              />
          ))}
      </div>

      <div className='flex flex-col items-center'>
        <span className='text-sm text-gray-700 dark:text-gray-400'>
            Hiển thị{' '}
            <span className='font-semibold text-gray-900 dark:text-white'>
                {(props.page - 1) * props.perPage + 1}
            </span>{' '}
            đến{' '}
            <span className='font-semibold text-gray-900 dark:text-white'>
                {(props.page - 1) * props.perPage + products.length}
            </span>{' '}
            trong tổng số{' '}
            <span className='font-semibold text-gray-900 dark:text-white'>
                {props.totalProducts}
            </span>{' '}
            Sản phẩm
        </span>
        <div className='inline-flex mt-2 xs:mt-0'>
          <Link
            href={
              props.page > 1
                  ? `/admin/product?page=${props.page - 1}&category=${
                        props.categorySlug || 'DEFAULT'
                    }&sort=${props.option || 'DEFAULT'}`
                  : `/admin/product?page=1&category=${
                        props.categorySlug || 'DEFAULT'
                    }&sort=${props.option || 'DEFAULT'}`
            }
          >
            <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                <svg
                    aria-hidden='true'
                    className='w-5 h-5 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                        clipRule='evenodd'
                    ></path>
                </svg>
                Prev
            </button>
          </Link>

          <Link
              href={
                  props.page < Math.ceil(props.totalProducts / props.perPage)
                      ? `/admin/product?page=${props.page + 1}&category=${
                            props.categorySlug || 'DEFAULT'
                        }&sort=${props.option || 'DEFAULT'}`
                      : `/admin/product?page=${props.page}&category=${
                            props.categorySlug || 'DEFAULT'
                        }&sort=${props.option || 'DEFAULT'}`
              }
          >
              <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Next
                  <svg
                      aria-hidden='true'
                      className='w-5 h-5 ml-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                  >
                      <path
                          fillRule='evenodd'
                          d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                          clipRule='evenodd'
                      ></path>
                  </svg>
              </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllProduct