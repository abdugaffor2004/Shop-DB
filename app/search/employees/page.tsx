'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Handbook } from '@/app/types/Handbook';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { useEmployeesFilterQuery } from './useEmployeesFilterQuery';
import EmployeesTable from '@/app/components/EmployeesTable/EmployeesTable';
import { useEmployeeDelete } from './useEmployeeDelete';

interface SelectedFilters {
  position: Handbook | null;
  acceptDate: Handbook | null;
  terminationDate: Handbook | null;
}

const Employees: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    position: null,
    acceptDate: null,
    terminationDate: null,
  });

  const { data, filterOptions, isFetching } = useEmployeesFilterQuery(selectedFilters);
  const { mutateAsync: deleteEmployee, isPending } = useEmployeeDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Должность"
              options={filterOptions.positionOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, position: null }));
              }}
              value={selectedFilters.position}
              onChange={item => setSelectedFilters(prev => ({ ...prev, position: item }))}
            />

            <SelectAsync
              className="w-full"
              placeholder="Дата принятия на работу"
              options={filterOptions.acceptDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, acceptDate: null }));
              }}
              value={selectedFilters.acceptDate}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, acceptDate: item }));
              }}
            />

            {/* <SelectAsync
              className="w-full"
              placeholder="Дата увольнения"
              options={filterOptions.terminationDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, terminationDate: null }));
              }}
              value={selectedFilters.terminationDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, terminationDate: item }))}
            /> */}
          </div>
        </div>

        {isFetching || isPending ? (
          <Center h="60vh">
            <Loader color="blue" />
          </Center>
        ) : data?.length === 0 || !data ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <EmployeesTable withDelete deleteRows={deleteEmployee} data={data} />
        )}
      </div>
    </div>
  );
};

export default Employees;
