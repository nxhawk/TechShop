import { listProductsForPagination } from '@/models/product';
import { listCategories } from '@/models/category';
import SideBarCategory from '../sideBarCategory/SideBarCategory';
import TopFilterBar from './TopFilterBar';
import CategoryPageInput from './CategoryPageInput';
import Link from 'next/link';
import ListProduct from '../product/ListProduct';

interface Props {
  totalProducts: number;
  perPage: number;
  page: number;
  categorySlug?: string;
  option?: string;
  min?: number;
  max?: number;
}

const CategoryPage = async(props: Props) => {
  const products = await listProductsForPagination(
    props.page,
    props.perPage,
    props.categorySlug,
    undefined,
    props.option,
    props.min,
    props.max,
  );
  const categories = await listCategories();
  return (
    <div className='flex flex-row mt-4 mx-5 space-x-4'>
      <div className='w-1/6'>
          <SideBarCategory categories={categories} />
      </div>
      <div className='w-5/6'>
        <div className='flex flex-row items-center px-4 py-2 bg-gray-100 my-2 rounded-md w-full justify-between'>
          <TopFilterBar
              option={props.option}
              category={props.categorySlug || 'DEFAULT'}
          />
          <div className='flex flex-row items-center'>
            <div className='text-sm mr-4 border-spacing-1'>
              <span className='text-amber-600'>
                  <CategoryPageInput
                      category={props.categorySlug || 'DEFAULT'}
                      page={props.page}
                      option={props.option}
                  />
              </span>{' '}
              / {Math.ceil(props.totalProducts / props.perPage)}
            </div>
            <Link
              className='w-8 font-bold text-md bg-white shadow-lg text-center rounded-md mr-2'
              href={
                props.page > 1
                    ? `/category/${props.categorySlug}?page=${
                          props.page - 1
                      }&sort=${props.option || 'DEFAULT'}&min=${props.min}&max=${
                          props.max
                      }`
                    : `/category/${props.categorySlug}?page=1&sort=${
                          props.option || 'DEFAULT'
                      }&min=${props.min}&max=${props.max}`
              }
            >
              <i className='bi bi-chevron-left'></i>
            </Link>
            <Link
                href={
                    props.page < Math.ceil(props.totalProducts / props.perPage)
                        ? `/category/${props.categorySlug}?page=${
                              props.page + 1
                          }&sort=${props.option || 'DEFAULT'}&min=${props.min}&max=${
                              props.max
                          }`
                        : `/category/${props.categorySlug}?page=${props.page}&sort=${
                              props.option || 'DEFAULT'
                          }&min=${props.min}&max=${props.max}`
                }
                className='w-8 font-bold text-md bg-white shadow-lg text-center rounded-md'
            >
                <i className='bi bi-chevron-right'></i>
            </Link>
          </div>
        </div>
        {products.length > 0 ? (
            <ListProduct products={products} />
        ) : (
            <div className='text-center w-full'>Không có sản phẩm nào</div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage