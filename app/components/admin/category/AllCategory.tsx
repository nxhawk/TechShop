import Link from 'next/link';
import React from 'react'
import { Category } from '@prisma/client';

const AllCategory = ({role}:{role: string}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const listCategoriesAlphabet = [] as Array<Array<Category>>;
  for (let i = 1; i <= alphabet.length; i++) {
      listCategoriesAlphabet.push([] as Array<Category>);
  }

  return (
    <div className='w-full bg-white px-10 py-10'>
      <div className='w-full flex justify-between text-xl'>
        {
          alphabet.map(data=>(
            <Link
              key={data}
              href={
                role === 'ADMIN' ? `/admin/category#${data}` : `/category/all#${data}`
              }
              className={
                listCategoriesAlphabet[data.charCodeAt(0) - 'A'.charCodeAt(0)].length > 0 ? 'text-amber-700' : 'text-gray-500 pointer-events-none'
              }
            >{data}</Link>
          ))
        }
      </div>
    </div>
  )
}

export default AllCategory