'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import axios from 'axios';
import { ProductFormValues } from './types/ProductFormValue';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';
import { useProductsFilterQuery } from '@/app/search/products/useProductsFilterQuery';
import { getTodayDate } from './getTodayDate';

const createProduct = async (data: ProductFormValues) => {
  const response = await axios.post(`/api/priducts`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateShop: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Handbook | null>();
  const [selectedShops, setSelectedShops] = useState<Handbook | null>();
  const [selectedBrand, setSelectedBrand] = useState<Handbook | null>();


  const form = useForm<ProductFormValues>({
    mode: 'controlled',
    initialValues: {
        name: '',
        description: '',
        price: 0,
        costPrice: 0,
        brand: '',
        weight: 0,
        size: 0,
        color: '',
        quantityInWarehouse: 0,
        isActive: true,
        createdAt: getTodayDate(),
        category: [],
        shops: []
    },
    validate: {},
  });

  const handleSubmit = (formValues: ProductFormValues) => {
    createProduct(formValues);
    form.reset();
    // setSelectedLocation(null);
  };
  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();
  const { data: category, filterOptions: categoryFilterOptions } = useProductsFilterQuery();
  const { data: brand, filterOptions: brandFilterOptions } = useProductsFilterQuery();


  
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
          <div className="flex gap-5">
            <NumberInput
              className="w-full mt-5"
              label="Стоимость"
              placeholder="Введите Стоимость..."
              {...form.getInputProps('price')}
            />
            <NumberInput
              className="w-full mt-5"
              label="Себестоимость"
              placeholder="Введите себестоимость..."
              {...form.getInputProps('costPrice')}
            />
          </div>
          <SelectAsync
            placeholder="Категория"
            label='Категория'
            className="mt-5 w-full flex-7/12"
            options={categoryFilterOptions.categoryOptions}
            value={selectedCategory || null}
            onChange={payload => {
              setSelectedCategory(payload);
              form.setFieldValue('categoryId', payload?.value || null);
            }}
          />
          <TextInput
            className="w-full mt-5"
            label="Цвет"
            placeholder="Введите цвет..."
            {...form.getInputProps('color')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <SelectAsync
            label = "Магазин"
            placeholder="Магазин"
            className="w-full flex-7/12 mb-5"
            options={shops ? shops.map(shops => ({
                value: shops.id,
                label: shops.name,
              })) : []}
            value = {selectedShops || null}
            onChange={payload => {
              setSelectedShops(payload);
              form.setFieldValue('shopId', payload?.value || null);
            }}
          />
          <NumberInput
            className="w-full mt-5"
            label="Количесиво на складе"
            placeholder="Введите количесиво..."
            {...form.getInputProps('quantityInWarehouse')}
          />
          <SelectAsync
            placeholder="Бренд"
            label='Бренд'
            className="mt-5 w-full flex-7/12"
            options={brandFilterOptions.brandOptions}
            value={selectedBrand || null}
            onChange={payload => {
              setSelectedBrand(payload);
              form.setFieldValue('brand', payload?.value || '');
            }}
          />
          <div className="flex gap-5">
            <NumberInput
                className="w-full mt-5"
                label="Размер"
                placeholder="Введите размер..."
                {...form.getInputProps('size')}
            />
            <NumberInput
              className="w-full mt-5"
              label="Вес"
              placeholder="Введите вес..."
              {...form.getInputProps('weight')}
            />
          </div>
        </Grid.Col>
        <Grid.Col>
            <TextInput
                className="w-full"
                label="Описание"
                placeholder="Введите описание..."
                {...form.getInputProps('description')}
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
