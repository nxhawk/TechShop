'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { convertBreadcrumb } from '@/utils/helper';
import { FullProduct } from '@/models/product';

interface Props {
  product: FullProduct;
}


interface Breadcrumbs {
  href: string;
  breadcrumb: string;
}

const Breadcumbs = ({ product }: Props) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumbs>>();
  useEffect(()=>{
    const pathArray = new Array<Breadcrumbs>();

    pathArray.push({
      breadcrumb: product.category?.name ?? '',
      href: `category/${product.category?.slug ?? ''}`,
    });

    pathArray.push({ breadcrumb: product.name, href: `/product/${product.slug}` });

    setBreadcrumbs(pathArray);
  },[product.category?.name, product.name, product.slug, product.category?.slug])
  if (!breadcrumbs) {
    return null;
  }
  return (
    <nav aria-label='breadcrumbs' className='my-4'>
      <ol className='breadcrumb flex flex-row text-base font-medium text-blue-500'>
        <li>
            <Link href='/'>Home</Link>
            <i className='bi bi-chevron-right text-black px-2'></i>
        </li>
        {breadcrumbs.map((breadcrumb: Breadcrumbs, index) => (
          <li key={breadcrumb.href}>
            {index != breadcrumbs.length - 1 ?(
              <div>
                <Link href={breadcrumb.href}>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Link>
                <i className='bi bi-chevron-right text-black px-2'></i>
              </div>
            ):(
              <div>
                <div className={'text-black'}>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcumbs