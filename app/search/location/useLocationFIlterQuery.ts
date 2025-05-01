import { useQuery } from '@tanstack/react-query';
import { Location } from './types/location';
import { Handbook } from '@/app/types/Handbook';

export const useLocationFilterQuery = () => {
  const { data, ...rest } = useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: async () => (await fetch('/api/location')).json(),
  });

  const regionOptions: Handbook[] =
    data
      ?.map(location => ({
        value: location.id,
        label: location.region,
      }))
      .filter((item, index, arr) => index === arr.findIndex(c => c.label === item.label)) ?? [];

  const locationFilterOptions = {
    regionOptions,
  };

  return { data, filterOptions: locationFilterOptions, ...rest };
};
