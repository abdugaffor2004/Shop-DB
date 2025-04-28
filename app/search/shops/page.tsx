'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { Handbook } from '../../types/Handbook';
import { useShopsFilterQuery } from './useShopsFilterQuery';
import ShopsTable from '@/app/components/ShopsTable/ShopsTable';
import { useShopDelete } from './useShopDelete';

interface SelectedFilters {
  city: Handbook | null;
  launchedDate: Handbook | null;
  closedDate: Handbook | null;
  position: Handbook | null;
}

const Shops: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    city: null,
    closedDate: null,
    launchedDate: null,
    position: null,
  });

  const { data, filterOptions, isLoading } = useShopsFilterQuery(selectedFilters);
  const { mutateAsync: deleteShop } = useShopDelete();

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
              placeholder="Дата открытия"
              options={filterOptions.launchedDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, launchedDate: null }));
              }}
              value={selectedFilters.launchedDate}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, launchedDate: item }));
              }}
            />

            <SelectAsync
              className="w-full"
              placeholder="Дата закрытия"
              options={filterOptions.cityOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, closedDate: null }));
              }}
              value={selectedFilters.closedDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, closedDate: item }))}
            />

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
          <ShopsTable withDelete deleteRows={deleteShop} data={data} />
        )}
      </div>
    </div>
  );
};

export default Shops;
