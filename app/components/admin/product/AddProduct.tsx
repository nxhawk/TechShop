'use client';
import { Brand, Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Loading, Notify } from 'notiflix';
import FormAddProduct, { Data } from './FormAddProduct';

const AddProduct = ({
  params,
}: {
  params: { categoriesList: Category[]; brandsList: Brand[] };
}) => {
  const router = useRouter();
  const onSumbit = async (product: Data, attachments: string[]) => {
    Loading.hourglass();
    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: product.name,
            price: Number(product.price),
            quantity: Number(product.quantity),
            sale: Number(product.sale),
            categoryId: product.category,
            brandId: product.brand,
            description: product.description,
            attachments: attachments,
        }),
      });

      const json = await res.json();

      if (json.message === 'success') {
        Notify.success('Thêm sản phẩm thành công', { clickToClose: true });
        router.push('/admin/product?created=true');
      } else {
        Notify.failure(json.message);
      }
    } catch (error) {
      Notify.failure('Thêm sản phẩm thất bại');
    }
    Loading.remove();
  }
  return (
    <FormAddProduct
      submit={onSumbit}
      brandsList={params.brandsList}
      categoriesList={params.categoriesList}
    />
  )
}

export default AddProduct