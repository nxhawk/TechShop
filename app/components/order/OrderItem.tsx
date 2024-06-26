'use client';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { InvoiceItemWithProduct } from '@/models/invoice';
import { CurrencyFormatter } from '@/utils/formatter';
import { Invoice, Status } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loading, Notify } from 'notiflix';
import { defaultValue } from '../Constant';
import Button from '../widgets/button/Button';
import ReBuyAndReview from './ReBuyAndReview';

interface Props {
  item?: InvoiceItemWithProduct;
  invoice?: Invoice;
  enableButton?: boolean | undefined;
}

const OrderItem = (props: Props) => {
  const product = props.item?.Product;
  const { user, updateMyCart } = useGlobalContext();
  const router = useRouter();

  async function addToCart() {
    
  }

  async function cancelOrder(orderID: string) {
    
  }

  async function buyNow() {
    await addToCart();
    router.push('/cart');
  }

  return (
    <>
      <div className='flex flex-row py-3 cursor-pointer w-full'>
        <div className='w-24'>
            <Image
                alt='poster'
                src={product?.attachments?.[0]?.path ?? defaultValue.image}
                className='w-fit h-fit'
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
            />
        </div>
        <div className='flex-1 ms-4 flex flex-col justify-between'>
            <div className='flex flex-col '>
                <Link
                    href={`/product/${product?.slug}`}
                    className='font-semibold text-lg line-clamp-2 hover:text-amber-500'
                >
                    {product?.name}
                </Link>
                <p className='text-gray-500'>Phân loại: {product?.category?.name}</p>
            </div>
            <p>x{props?.item?.quantity}</p>
        </div>

        <div className='w-60 flex flex-col justify-center text-right'>
            <span className='text-amber-500 text-lg font-semibold'>
                {CurrencyFormatter.format(
                    (product?.price || 0) * (1 - (product?.sale || 0)),
                )}
            </span>
            <span className='text-gray-500 line-through me-1'>
                {CurrencyFormatter.format(product?.price || 0)}
            </span>
        </div>
      </div>

      {props.enableButton != false && (
        <>
          {props.invoice?.status === Status.PENDING && (
              <div className='flex justify-end items-center mt-4'>
                  <div className='flex justify-end items-center space-x-5'>
                      <Button
                          onClick={() => {
                              cancelOrder(props.invoice?.id || '');
                          }}
                          className='rounded-sm bg-amber-500 text-white hover:bg-amber-700 px-5 py-2 cancel'
                      >
                          Hủy
                      </Button>
                  </div>
              </div>
          )}

          {props.invoice?.status === Status.DELIVERED && (
              <ReBuyAndReview
                  buyNow={buyNow}
                  invoiceItemId={props.item?.id}
                  productId={product?.id}
                  productSlug={product?.slug}
                  invoiceId={props.invoice.id}
              />
          )}
        </>
      )}
    </>
  )
}

export default OrderItem