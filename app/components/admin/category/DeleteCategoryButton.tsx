'use client';

import { Category } from '@prisma/client'
import React, { useState } from 'react'
import DeleteCategoryModal from './DeleteCategoryModal';

const DeleteCategoryButton = ({Category}: {Category: Category}) => {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <span
        className='text-gray-300 hover:text-amber-500 cursor-pointer invisible group-hover:visible'
        onClick={() => {
          setShowing(true);
        }}
      >
        <i className='bi bi-trash'></i>
      </span>
      <DeleteCategoryModal
        Category={Category}
        setShowing={setShowing}
        showing={showing}
        key={Category.id}
      />
    </>
  )
}

export default DeleteCategoryButton