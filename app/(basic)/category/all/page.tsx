import AllCategories from '@/app/components/admin/category/AllCategory';

export const metadata = {
  title: 'Tất cả danh mục | Danh mục | TechWorld',
  icons: '/images/logo.png',
};

const Page = () => {
  return (
    <div className='w-full my-20'>
      <AllCategories role='USER'/>
    </div>
  )
}

export default Page