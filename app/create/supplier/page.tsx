'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';

import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';

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
      shop: [],
    },
    validate: {},
  });

  const handleSubmit = (formValues: SupplierFormValues) => {
    createSupplier(formValues);
    form.reset();
  };

  const [selectedShop, setSelectedShop] = useState<Handbook | null>();


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
            label="email"
            placeholder="Введите email..."
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
            
      <SelectAsync
            placeholder="Магазин"
            className="mt-5 w-full flex-7/12"
            options={shops ? shops.map(shop => ({
                value: shop.id,
                label: shop.name,
              })) : []}
            value={selectedShop || null}
            onChange={payload => {
              setSelectedShop(payload);
              form.setFieldValue('shopId', payload?.value || null);
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
