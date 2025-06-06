'use client';

import { Button, Flex, Grid, Group, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC } from 'react';

import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { SupplierFormValues } from './types/SupplierFormValues';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';

const createSupplier = async (data: SupplierFormValues) => {
  const response = await axios.post(`/api/supplier`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateSupplier: FC = () => {
  const [selectedShops, shopsHandlers] = useListState<Handbook>([]);
  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();

  const form = useForm<SupplierFormValues>({
    mode: 'controlled',
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      region: '',
      country: '',
      shops: [],
    },
    validate: {},
  });

  const handleSubmit = (formValues: SupplierFormValues) => {
    createSupplier(formValues);
    form.reset();
    shopsHandlers.setState([]);
  };

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
            {...form.getInputProps('name')}
          />

          <TextInput
            className="w-full mt-5"
            label="Введите email"
            placeholder="example@google.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            className="w-full mt-5"
            label="Номер телефона"
            placeholder="Введите телефон без +7"
            {...form.getInputProps('phoneNumber')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Адрес"
            placeholder="Введите адрес..."
            {...form.getInputProps('address')}
          />
          <div className="flex gap-5">
            <TextInput
              className="w-full mt-5"
              label="Город"
              placeholder="Введите город..."
              {...form.getInputProps('city')}
            />

            <TextInput
              className="w-full mt-5"
              label="Регион"
              placeholder="Введите регион..."
              {...form.getInputProps('region')}
            />
          </div>
          <TextInput
            className="w-full mt-5 "
            label="Регион"
            placeholder="Введите страну..."
            {...form.getInputProps('country')}
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

export default CreateSupplier;
