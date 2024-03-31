import Link from 'next/link';

export const metadata = {
    title: 'Giới thiệu | TechWorld',
    icons: '/images/logo.png',
};

const Page = () => {
  return (
    <div className='w-full max-w-lg bg-white h-full px-20 py-20 flex flex-col mx-auto'>
        <div className='text-4xl font-bold text-center'>TechWorld</div>
        <span className='text-sm mb-5 text-center'>From VNUHCM-US</span>
    </div>
  )
}

export default Page