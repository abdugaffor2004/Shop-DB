import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Stocks } from './types/Stocks';

interface StocksFilterSearchparams {
  discountPercentage: Handbook | null;
  startDate: Handbook | null;
  endDate: Handbook | null;
}

export const useStocksFilterQuery = (searchParams?: StocksFilterSearchparams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['stocks', searchParams],
    queryFn: async (): Promise<Stocks[]> => {
      const response = await axios.get<unknown, AxiosResponse<Stocks[]>>('/api/stocks', {
        params: {
          dp: searchParams?.discountPercentage?.label,
          sd: searchParams?.startDate?.label,
          ed: searchParams?.endDate?.label,
        },
      });
      return response.data;
    },
  });

  const discountPercentageOptions: Handbook[] =
    data
      ?.map(stocks => ({ value: stocks.id, label: `${stocks.discountPercentage.toFixed()}%` }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const startDateoptions: Handbook[] =
    data
      ?.map(stocks => ({ value: stocks.id, label: stocks.startDate }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const endDateOptions: Handbook[] =
    data
      ?.map(stocks => ({ value: stocks.id, label: stocks.endDate }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const stocksFilterOptions = {
    discountPercentageOptions,
    startDateoptions,
    endDateOptions,
  };

  return { data, filterOptions: stocksFilterOptions, ...rest };
};
