'use client';

import { useState, useEffect } from 'react';
import { defaultStatus } from '../Constant';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Block } from 'notiflix';
import { InvoiceWithProducts } from '@/models/invoice';
import OrderBox from './OrderBox';

const Order = () => {
  const [index, setIndex] = useState(0);
  const [orders, setOrders] = useState<Array<InvoiceWithProducts>>([]);
  const [ordersFilter, setOrdersFilter] = useState<Array<InvoiceWithProducts>>([]);
  const { user } = useGlobalContext();
  useEffect(() => {
    async function getOrders() {
        Block.hourglass('.orderpage');
        const res = await fetch('/api/invoice');
        const data = await res.json();
        setOrders(data?.data);
        setOrdersFilter(data?.data);
        Block.remove('.orderpage');
    }
    getOrders();
  }, [user]);

  useEffect(() => {
    function filterOrders() {
        if (index == 0) setOrdersFilter(orders);
        else
            setOrdersFilter(
                orders.filter(
                    order => order.status == defaultStatus.statusOrder[index - 1].status,
                ),
            );
    }

    filterOrders();
  }, [index, orders]);

  return (
    <>
      <div className='flex flex-col justify-start items-center w-full orderpage'>
        <div className='flex justify-between items-center mt-2 rounded-md w-full text-center'>
          <div
              className={
                  'flex-1 pb-2  hover:text-amber-500 cursor-pointer ' +
                  (index == 0
                      ? 'text-amber-600 font-semibold border-b-2 border-amber-600'
                      : 'text-black ')
              }
              onClick={() => {
                  setIndex(0);
              }}
          >
              Tất cả
          </div>
          {defaultStatus.statusOrder.map((s, key: number) => {
              return (
                  <div
                      key={key + 1}
                      className={
                          'flex-1 pb-2  hover:text-amber-500 cursor-pointer ' +
                          (index == key + 1
                              ? 'text-amber-600 font-semibold border-b-2 border-amber-600'
                              : 'border-b-2 border-solid  border-transparent text-black ')
                      }
                      onClick={() => {
                          setIndex(key + 1);
                      }}
                  >
                      {s.message}
                  </div>
              );
          })}
        </div>
        <hr className='h-0.5 bg-gray-100 w-full mb-4' />
        <div className='flex flex-col space-y-5 mt-4 w-full'>
            {ordersFilter?.map((order, key: number) => {
                return <OrderBox data={order} key={key} />;
            })}
        </div>
      </div>
    </>
  )
}

export default Order