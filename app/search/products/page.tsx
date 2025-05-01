'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { Handbook } from '../../types/Handbook';
import { useProductsDelete } from './useProductsDelete';
import { useProductsFilterQuery } from './useProductsFilterQuery';
import ProductTable from '@/app/components/ProductsTable/ProductsTable';

interface SelectedFilters {
  brand: Handbook | null;
  category: Handbook | null;
  shop: Handbook | null;
}

const Products: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brand: null,
    category: null,
    shop: null,
  });

  const { data, filterOptions, isLoading } = useProductsFilterQuery(selectedFilters);
  const { mutateAsync: deleteProducts, isPending } = useProductsDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Бренд"
              options={filterOptions.brandOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, brand: null }));
              }}
              value={selectedFilters.brand}
              onChange={item => setSelectedFilters(prev => ({ ...prev, brand: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Категория"
              options={filterOptions.categoryOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, category: null }));
              }}
              value={selectedFilters.category}
              onChange={item => setSelectedFilters(prev => ({ ...prev, category: item }))}
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
          <ProductTable withDelete deleteRows={deleteProducts} data={data} />
        )}
      </div>
    </div>
  );
};

export default Products;
