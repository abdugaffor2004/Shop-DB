'use client';
import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';

import { IconPlus } from '@tabler/icons-react';
import React, { FC } from 'react';

import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { StockFormValues } from './types/StockFormValue';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';

const createShop = async (data: StockFormValues) => {
  const response = await axios.post(`/api/stocks`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateShop: FC = () => {
  const [selectedShops, shopsHandlers] = useListState<Handbook>([]);

  const form = useForm<StockFormValues>({
    mode: 'controlled',
    initialValues: {
      title: '',
      description: '',
      discountPercentage: 0,
      fixedDiscount: 0,
      startDate: '',
      endDate: '',
      shops: [],
    },
    validate: {},
  });

  const handleSubmit = (formValues: StockFormValues) => {
    createShop(formValues);
    form.reset();
  };

  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Название"
            placeholder="Введите название..."
            {...form.getInputProps('title')}
          />

          <TextInput
            className="w-full mt-5"
            label="Дата начала"
            placeholder="Введите дату..."
            {...form.getInputProps('startDate')}
          />
          <TextInput
            className="w-full mt-5"
            label="Дата конца"
            placeholder="Введите дату..."
            {...form.getInputProps('endDate')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Описание"
            placeholder="Введите описание..."
            {...form.getInputProps('description')}
          />

          <NumberInput
            className="w-full mt-5"
            label="Процент скидки"
            placeholder="Введите процент скидки..."
            {...form.getInputProps('discountPercentage')}
          />

          <NumberInput
            className="w-full mt-5"
            label="Фиксированная скидка в рублях"
            placeholder="Введите фиксированную скидку..."
            {...form.getInputProps('fixedDiscount')}
          />
        </Grid.Col>
        <Grid.Col>
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
        </Grid.Col>
      </Grid>

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

export default CreateShop;
