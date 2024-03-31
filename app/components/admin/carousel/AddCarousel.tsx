'use client';
import { useRouter } from 'next/navigation';
import { Loading, Notify } from 'notiflix';
import CarouselForm, { Data } from './CarouselForm';

const AddCarousel = () => {
  const router = useRouter();
  const onSubmit = async (carousel: Data, attachments: string) => {
    Loading.hourglass();
    try {
      const res = await fetch('/api/carousel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: carousel.url,
            main: carousel.main,
            attachments: attachments,
        }),
      });
      const json = await res.json();

      if (json.message === 'success') {
        Notify.success('Thêm ảnh bìa thành công', { clickToClose: true });
        router.push('/admin/carousel?created=true');
      } else {
        Notify.failure(json.message);
      }
    } catch (error) {
      Notify.failure('Thêm ảnh bìa thất bại');
    }
    Loading.remove();
  }
  return (
    <CarouselForm submit={onSubmit}/>
  )
}

export default AddCarousel