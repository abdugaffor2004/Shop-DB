import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import { Shop } from './types/Shop';
import axios, { AxiosResponse } from 'axios';

interface ShopsFilterSearchparams {
  city: Handbook | null;
  launchedDate: Handbook | null;
  closedDate: Handbook | null;
  position: Handbook | null;
}

export const useShopsFilterQuery = (searchParams?: ShopsFilterSearchparams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['shops', searchParams],
    queryFn: async (): Promise<Shop[]> => {
      const response = await axios.get<unknown, AxiosResponse<Shop[]>>('/api/shops', {
        params: {
          c: searchParams?.city?.label,
          ld: searchParams?.launchedDate?.label,
          cd: searchParams?.closedDate?.label,
          p: searchParams?.position?.label,
        },
      });
      return response.data;
    },
  });

  const cityOptions: Handbook[] =
    data
      ?.map(shop => ({ value: shop.id, label: shop.city }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const launchedDateOptions: Handbook[] =
    data
      ?.map(shop => ({
        value: shop.id,
        label: shop.launchedDate,
      }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const closedDateOptions: Handbook[] =
    data
      ?.map(shop => ({
        value: shop.id,
        label: shop.closedDate,
      }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const positionOptions: Handbook[] =
    data
      ?.flatMap(shop => shop.employees)
      .map(employee => ({ value: employee.id, label: employee.position })) ?? [];

  const shopsFilterOptions = {
    cityOptions,
    launchedDateOptions,
    closedDateOptions,
    positionOptions,
  };

  return { data, filterOptions: shopsFilterOptions, ...rest };
};
