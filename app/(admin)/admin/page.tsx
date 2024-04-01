import { numberOfBrands } from '@/models/brand';
import numberOfCategories from '@/models/category';
import numberOfInvoices from '@/models/invoice';
import { numberOfProducts } from '@/models/product';
import { numberOfReviews } from '@/models/review';
import { numberOfUsers } from '@/models/user';
import Dashboard from '@/app/components/admin/dashboard/Dashboard';

export const metadata = {
  title: 'Dashboard | Admin site | TechWorld',
  icons: '/images/logo.png',
};

const Page = async() => {
  const totalProducts = await numberOfProducts();
  const totalUsers = await numberOfUsers();
  const totalReviews = await numberOfReviews();
  const totalBrands = await numberOfBrands();
  const totalCategories = await numberOfCategories();
  const totalInvoices = await numberOfInvoices();
  return (
    <div className='w-full'>
      <Dashboard
        totalBrand={totalBrands}
        totalCategories={totalCategories}
        totalInvoice={totalInvoices}
        totalProducts={totalProducts}
        totalReviews={totalReviews}
        totalUsers={totalUsers}
      />
    </div>
  )
}

export default Page