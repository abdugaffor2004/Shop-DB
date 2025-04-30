import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Employee } from './types/employee';

interface EmployeesFilterSearchParams {
  position: Handbook | null;
  acceptDate: Handbook | null;
  terminationDate: Handbook | null;
}

export const useEmployeesFilterQuery = (searchParams?: EmployeesFilterSearchParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['employees', searchParams],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Employee[]>>('/api/employees', {
        params: {
          p: searchParams?.position?.label,
          ad: searchParams?.acceptDate?.label,
          td: searchParams?.terminationDate?.label,
        },
      });
      return response.data;
    },
  });

  const positionOptions: Handbook[] =
    data
      ?.map(employee => ({ value: employee.id, label: employee.position }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const acceptDateOptions: Handbook[] =
    data
      ?.map(employee => ({ value: employee.id, label: employee.acceptDate }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const terminationDateOptions: Handbook[] =
    data
      ?.map(employee => ({ value: employee.id, label: employee.terminationDate }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const nameOptions: Handbook[] =
    data?.map(employee => ({
      value: employee.id,
      label: `${employee.lastName} ${employee.firstName}`,
    })) ?? [];

  const employeeFilterOptions = {
    positionOptions,
    acceptDateOptions,
    terminationDateOptions,
    nameOptions,
  };

  return { data, filterOptions: employeeFilterOptions, ...rest };
};
