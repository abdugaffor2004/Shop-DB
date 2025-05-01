'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { Handbook } from '../../types/Handbook';
import { useSupplierFilterQuery } from './useSupplierFilterQuery';
import { useSupplierDelete } from './useSupplierDelete';
import SuppliersTable from '@/app/components/SuppliersTable/SupplierTable';

interface SelectedFilters {
  city: Handbook | null;
  name: Handbook | null;
}

const Shops: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    city: null,
    name: null,
  });

  const { data, filterOptions, isLoading } = useSupplierFilterQuery(selectedFilters);
  const { mutateAsync: deleteSupplier, isPending } = useSupplierDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Город"
              options={filterOptions.cityOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, city: null }));
              }}
              value={selectedFilters.city}
              onChange={item => setSelectedFilters(prev => ({ ...prev, city: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Название"
              options={filterOptions.nameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, name: null }));
              }}
              value={selectedFilters.name}
              onChange={item => setSelectedFilters(prev => ({ ...prev, name: item }))}
            />
          </div>
        </div>

        {isLoading || isPending ? (
          <Center h="60vh">
            <Loader color="blue" />
          </Center>
        ) : data?.length === 0 || !data ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <SuppliersTable withDelete deleteRows={deleteSupplier} data={data} />
        )}
      </div>
    </div>
  );
};

export default Shops;
