'use client';
import { useRouter } from 'next/navigation';

const CategoryPageInput = ({
  category,
  option,
  page,
}: {
  category: string;
  option?: string;
  page: number;
}) => {
  const router = useRouter();
  return (
    <>
        <input
            key={`page${page}`}
            type='number'
            defaultValue={page}
            onKeyUp={event => {
                if (event.key == 'Enter') {
                    router.push(
                        `/category/${category}?sort=${option || 'DEFAULT'}&page=${
                            event.currentTarget.value
                        }`,
                    );
                }
            }}
            className='w-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        ></input>
    </>
  )
}

export default CategoryPageInput