import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Supplier } from './types/Suppliers';

interface SupplierFilterSearchparams {
  city: Handbook | null;
  name: Handbook | null;
}

export const useSupplierFilterQuery = (searchParams?: SupplierFilterSearchparams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['supplier', searchParams],
    queryFn: async (): Promise<Supplier[]> => {
      const response = await axios.get<unknown, AxiosResponse<Supplier[]>>('/api/supplier', {
        params: {
          c: searchParams?.city?.label,
          n: searchParams?.name?.label,
        },
      });
      return response.data;
    },
  });

  const cityOptions: Handbook[] =
    data
      ?.map(supplier => ({ value: supplier.id, label: supplier.city }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

    const nameOptions: Handbook[] =
      data
        ?.map(supplier => ({ value: supplier.id, label: supplier.name }))
        .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const supplierFilterOptions = {
    cityOptions,
    nameOptions,
  };

  return { data, filterOptions: supplierFilterOptions, ...rest };
};
