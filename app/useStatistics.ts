import { useQuery } from '@tanstack/react-query';
import { ShopCountByLocation } from './components/ShopCountByLocationTable';
import { ShopCountByCity } from './components/ShopCountByCityTable';

interface Statistics {
  shopCountByLocation: ShopCountByLocation[];
  shopCountByCity: ShopCountByCity[];
  shopsTotalCount: number;
  suppliersTotalCount: number;
  employeesTotalCount: number;
  warehousesTotalCount: number;
}

export const useStatistics = () => {
  return useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: async () => (await fetch('/api/statistics')).json(),
  });
};
