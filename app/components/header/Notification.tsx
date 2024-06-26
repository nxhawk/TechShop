'use client';

import Link from 'next/link';
import React, { useState } from 'react'

const Notification = () => {
  const [isNotiHovering, setIsNotiHovering] = useState(false);
  
  const handleMouseOverNoti = () => {
      setIsNotiHovering(true);
  };

  const handleMouseOutNoti = () => {
      setIsNotiHovering(false);
  };

  const notifications = null;

  return (
    <>
      <Link
        href='/user/notification'
        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
        aria-current='page'
        onMouseOver={handleMouseOverNoti}
        onMouseOut={handleMouseOutNoti}
      >
        <i className='bi bi-bell' style={{ fontSize: 25 }}></i>
      </Link>
      {isNotiHovering && (
        <div
          className='absolute z-10 px-4 py-4 bg-white rounded-md outline outline-1 outline-gray-200'
          onMouseOver={handleMouseOverNoti}
          onMouseOut={handleMouseOutNoti}
        >
          <p className='text-sm text-gray-500 mb-2 ms-5'>Thông báo</p>

        </div>
      )}
    </>
  )
}

export default Notification