import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Warehouse } from './types/Warehouses';

interface WarehousesFilterSearchparams {
  shop: Handbook | null;
  size: Handbook | null;
  lastDepositDate: Handbook | null;
}

export const useWarehouseFilterQuery = (searchParams?: WarehousesFilterSearchparams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['warehouse', searchParams],
    queryFn: async (): Promise<Warehouse[]> => {
      const response = await axios.get<unknown, AxiosResponse<Warehouse[]>>('/api/warehouses', {
        params: {
          s: searchParams?.shop?.label,
          sz: searchParams?.size?.label,
          ld: searchParams?.lastDepositDate?.label,

        },
      });
      return response.data;
    },
  });
  const shops = data?.flatMap(w => w.shops) ?? [];

  const uniqueShopsMap = new Map<string, { value: string, label: string }>();
  for (const shop of shops) {
    // Проверяем, что shop не undefined
    if (!shop) continue;
  
    if (!uniqueShopsMap.has(shop.id)) {
      uniqueShopsMap.set(shop.id, { value: shop.id, label: shop.name });
    }
  }
  const shopOptions: Handbook[] = Array.from(uniqueShopsMap.values());
    const sizeOptions: Handbook[] =
      data
      ?.map(warehouse => ({ value: warehouse.id, label: warehouse.size.toString()}))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];
      const lastDepositDateOptions: Handbook[] =
      data
      ?.map(warehouse => ({ value: warehouse.id, label: warehouse.lastDepositDate}))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const warehouseFilterOptions = {
    shopOptions,
    sizeOptions,
    lastDepositDateOptions
  };

  return { data, filterOptions: warehouseFilterOptions, ...rest };
};
