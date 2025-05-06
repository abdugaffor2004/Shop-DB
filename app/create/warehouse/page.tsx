'use client';
import React, { FC } from 'react';
import { WarehouseFormValues } from './types/warehouse-form-values';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { Button, Flex, Group, NumberInput, Stack, TextInput } from '@mantine/core';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { IconPlus } from '@tabler/icons-react';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';
import { Handbook } from '@/app/types/Handbook';
import { useListState } from '@mantine/hooks';
import { useProductsFilterQuery } from '@/app/search/products/useProductsFilterQuery';
import { DateInput } from '@mantine/dates';

const createWarehouse = async (data: WarehouseFormValues) => {
  const response = await axios.post(`/api/warehouses`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateWarehouse: FC = () => {
  const [selectedShops, shopsHandlers] = useListState<Handbook>([]);
  const [selectedProducts, productsHandlers] = useListState<Handbook>([]);

  const form = useForm<WarehouseFormValues>({
    mode: 'controlled',
    initialValues: {
      name: '',
      lastDepositDate: '',
      size: 0,
      products: [],
      shops: [],
    },
    validate: {},
  });

  const handleSubmit = (formValues: WarehouseFormValues) => {
    createWarehouse(formValues);
    form.reset();
  };

  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();
  const { data: products, filterOptions: productsFilterOptions } = useProductsFilterQuery();

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <Stack>
        <TextInput
          className="w-full"
          label="Название"
          placeholder="Введите название..."
          {...form.getInputProps('name')}
        />
        <Flex gap={20}>
          <DateInput
            className="w-full mt-5"
            label="Дата последнего пополнения"
            placeholder="Введите дату..."
            {...form.getInputProps('lastDepositDate')}
          />

          <NumberInput
            className="w-full mt-5"
            label="Размер"
            placeholder="Введите размер..."
            {...form.getInputProps('size')}
          />
        </Flex>

        <MultiSelectAsync
          placeholder="Магазины"
          className="mt-5 w-full flex-7/12"
          options={shopsFilterOptions.nameOptions}
          value={selectedShops}
          onChange={payload => {
            shopsHandlers.setState(payload);

            const result = shops
              ?.filter(item => payload.find(value => value.value === item.id))
              .map(item => ({ id: item.id }));

            form.setFieldValue('shops', result || []);
          }}
        />

        <MultiSelectAsync
          placeholder="Товары"
          className="mt-5 w-full flex-7/12"
          options={productsFilterOptions.nameOptions}
          value={selectedProducts}
          onChange={payload => {
            productsHandlers.setState(payload);

            const result = products
              ?.filter(item => payload.find(value => value.value === item.id))
              .map(item => ({ id: item.id }));

            form.setFieldValue('products', result || []);
          }}
        />
      </Stack>

      <Flex justify="end">
        <Group className="mt-8">
          <Button disabled={!form.isValid()} type="submit">
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CreateWarehouse;
