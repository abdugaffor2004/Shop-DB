import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Product } from './types/products';

interface ProductFilterSearchparams {
  brand: Handbook | null;
  category: Handbook | null;
  shop: Handbook | null;
}

export const useProductsFilterQuery = (searchParams?: ProductFilterSearchparams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: async (): Promise<Product[]> => {
      const response = await axios.get<unknown, AxiosResponse<Product[]>>('/api/products', {
        params: {
          b: searchParams?.brand?.label,
          c: searchParams?.category?.label,
          s: searchParams?.shop?.label,
        },
      });
      return response.data;
    },
  });

  const brandOptions: Handbook[] =
    data
      ?.map(products => ({ value: products.id, label: products.brand }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const categoryOptions: Handbook[] =
    data
      ?.map(product => {
        if (!product.category) return { value: '', label: '' };
        return {
          value: product.category.id,
          label: product.category.name,
        };
      })
      .filter((item, index, arr) => index === arr.findIndex(c => c.label === item.label)) ?? [];

  const nameOptions: Handbook[] =
    data
      ?.map(products => ({ value: products.id, label: products.name }))
      .filter((item, index, arr) => index === arr.findIndex(c => c.label === item.label)) ?? [];

  const productFilterOptions = {
    brandOptions,
    categoryOptions,
    nameOptions,
  };

  return { data, filterOptions: productFilterOptions, ...rest };
};
