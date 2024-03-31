import React from 'react'

interface ReviewProps {
  image?: string;
  username?: string;
  star?: number;
  reviewText?: string;
  time?: string;
}

const ReviewItem = ({
  image = '/images/logo.png',
  reviewText = 'Sản phẩm tốt. Rất nên sử dụng để cấp ẩm cho da. Mềm, mịn, mướt da.',
  star = 1,
  username = 'abcxay',
  time = '12:12:12 12/12/2012',
}: ReviewProps) => {
  return (
    <div className='flex ml-8 mt-6 border-b py-2'>
      
    </div>
  )
}

export default ReviewItem