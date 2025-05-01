'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { Handbook } from '../../types/Handbook';
import { useStocksFilterQuery } from './useStocksFilterQuery';
import { useStocksDelete } from './useStocksDelete';
import StocksTable from '@/app/components/StocksTable/StocksTable';

interface SelectedFilters {
  discountPercentage: Handbook | null;
  startDate: Handbook | null;
  endDate: Handbook | null;
}

const Stocks: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    discountPercentage: null,
    startDate: null,
    endDate: null,
  });

  const { data, filterOptions, isLoading } = useStocksFilterQuery(selectedFilters);
  const { mutateAsync: deleteStocks, isPending } = useStocksDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Процент скидки"
              options={filterOptions.discountPercentageOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, discountPercentage: null }));
              }}
              value={selectedFilters.discountPercentage}
              onChange={item => setSelectedFilters(prev => ({ ...prev, discountPercentage: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Начало скидки"
              options={filterOptions.startDateoptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, startDate: null }));
              }}
              value={selectedFilters.startDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, startDate: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Конец скидки"
              options={filterOptions.endDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, endDate: null }));
              }}
              value={selectedFilters.endDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, endDate: item }))}
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
          <StocksTable withDelete deleteRows={deleteStocks} data={data} />
        )}
      </div>
    </div>
  );
};

export default Stocks;
