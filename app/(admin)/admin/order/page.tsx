import { listInvoices } from '@/models/invoice';
import OrderList from '@/app/components/admin/order/OrderList';

export const metadata = {
  title: 'Quản lý đơn hàng | Admin site | TechWorld',
  icons: '/images/logo.png',
};

export const revalidate = 0;

const Page = async() => {
  const orders = await listInvoices();
  return (
    <div className='w-full'>
      <OrderList orders={orders} />
    </div>
  )
}

export default Page