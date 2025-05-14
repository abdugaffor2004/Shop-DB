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
import { useListState, useToggle } from '@mantine/hooks';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';

const createProduct = async (data: ProductFormValues) => {
  const response = await axios.post(`/api/products`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateShop: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Handbook | null>();
  const [selectedShops, shopsHandlers] = useListState<Handbook>([]);
  const [selectedBrand, setSelectedBrand] = useState<Handbook | null>();

  const [isBrandEditable, setIsBrandEditable] = useToggle();
  const [isCategoryEditable, setIsCategoryEditable] = useToggle();

  const form = useForm<ProductFormValues>({
    mode: 'controlled',
    initialValues: {
      name: '',
      description: '',
      price: 0,
      costPrice: 0,
      brand: '',
      weight: 0,
      size: '',
      color: '',
      quantityInWarehouse: 0,
      isActive: true,
      createdAt: getTodayDate(),
      categoryId: null,
      shops: [],
      category: {
        name: '',
        description: '',
      },
    },
    validate: {},
  });

  const handleSubmit = (formValues: ProductFormValues) => {
    createProduct(formValues);
    form.reset();
  };
  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();
  const { filterOptions: productFilterOptions } = useProductsFilterQuery();

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[74vh] mt-10 mx-100 p-10 bg-white rounded-lg"
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
              allowNegative={false}
              suffix=" ₽"
              placeholder="Введите Стоимость..."
              {...form.getInputProps('price')}
            />
            <NumberInput
              className="w-full mt-5"
              label="Себестоимость"
              allowNegative={false}
              suffix=" ₽"
              placeholder="Введите себестоимость..."
              {...form.getInputProps('costPrice')}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            {isCategoryEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите категорию"
                label="Категория"
                onChange={e => form.setFieldValue('category.name', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Категория"
                label="Категория"
                className=" w-full flex-7/12"
                options={productFilterOptions.categoryOptions}
                value={selectedCategory || null}
                onChange={payload => {
                  setSelectedCategory(payload);
                  form.setFieldValue('categoryId', payload?.value || null);
                }}
              />
            )}

            <Button className="mt-5" onClick={() => setIsCategoryEditable()} fz={12} px={7}>
              {isCategoryEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>
          <TextInput
            className="w-full mt-5"
            label="Цвет"
            placeholder="Введите цвет..."
            {...form.getInputProps('color')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <MultiSelectAsync
            placeholder="Магазины"
            className="mt-6 w-full flex-7/12"
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
          <div className="flex gap-5">
            <NumberInput
              className="w-full mt-5"
              label="Количество на складе"
              allowNegative={false}
              suffix=" единиц"
              placeholder="Введите количество..."
              {...form.getInputProps('quantityInWarehouse')}
            />
            <NumberInput
              className="w-full mt-5"
              label="Вес в кг"
              allowNegative={false}
              suffix=" кг"
              placeholder="Введите вес..."
              {...form.getInputProps('weight')}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            {isBrandEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите брэнд"
                label="Бренд"
                onChange={e => form.setFieldValue('brand', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Бренд"
                label="Бренд"
                className=" w-full flex-7/12"
                options={productFilterOptions.brandOptions}
                value={selectedBrand || null}
                onChange={payload => {
                  setSelectedBrand(payload);
                  form.setFieldValue('brand', payload?.label || '');
                }}
              />
            )}

            <Button className="mt-5" onClick={() => setIsBrandEditable()} fz={12} px={7}>
              {isBrandEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>

          <TextInput
            className="w-full mt-5"
            label="Размер"
            placeholder="Введите размер в см..."
            {...form.getInputProps('size')}
          />
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
