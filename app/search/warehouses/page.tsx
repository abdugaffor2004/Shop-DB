'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { Handbook } from '../../types/Handbook';
import { useWarehouseFilterQuery } from './useWarehousesFilterQuery';
import { useWarehousesDelete } from './useWarehousesDelete';
import WarehouseTable from '@/app/components/WarehousesTable/WarehousesTable';

interface SelectedFilters {
  shop: Handbook | null;
  size: Handbook | null;
  lastDepositDate: Handbook | null;
}

const Warehouses: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    shop: null,
    size: null,
    lastDepositDate: null,
  });

  const { data, filterOptions, isLoading } = useWarehouseFilterQuery(selectedFilters);
  const { mutateAsync: deleteWarehouses } = useWarehousesDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Магазин"
              options={filterOptions.shopOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, shop: null }));
              }}
              value={selectedFilters.shop}
              onChange={item => setSelectedFilters(prev => ({ ...prev, shop: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Размер склада"
              options={filterOptions.sizeOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, size: null }));
              }}
              value={selectedFilters.size}
              onChange={item => setSelectedFilters(prev => ({ ...prev, size: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Дата последнего пополнения"
              options={filterOptions.lastDepositDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, lastDepositDate: null }));
              }}
              value={selectedFilters.lastDepositDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, lastDepositDate: item }))}
            />
          </div>
        </div>

        {isLoading ? (
          <Center h="60vh">
            <Loader color="blue" />
          </Center>
        ) : data?.length === 0 || !data ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <WarehouseTable withDelete deleteRows={deleteWarehouses} data={data} />
        )}
      </div>
    </div>
  );
};

export default Warehouses;
