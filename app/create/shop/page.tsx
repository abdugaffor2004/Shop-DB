'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';

import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';

import axios from 'axios';
import { ShopFormValues } from './types/ShopFormValue';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { useEmployeesFilterQuery } from '@/app/search/employees/useEmployeesFilterQuery';
import { useListState } from '@mantine/hooks';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { useSupplierFilterQuery } from '@/app/search/suppliers/useSupplierFilterQuery';
import { useLocationFilterQuery } from '@/app/search/location/useLocationFIlterQuery';
import { useWarehouseFilterQuery } from '@/app/search/warehouses/useWarehousesFilterQuery';
import { DateInput } from '@mantine/dates';

const createShop = async (data: ShopFormValues) => {
  const response = await axios.post(`/api/shops`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateShop: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Handbook | null>();
  const [selectedEmployees, employeeHandlers] = useListState<Handbook>([]);
  const [selectedSuppliers, suppliersHandlers] = useListState<Handbook>([]);
  const [selectedWarehouses, warehousesHandlers] = useListState<Handbook>([]);

  const form = useForm<ShopFormValues>({
    mode: 'controlled',
    initialValues: {
      name: '',
      city: '',
      areaValue: 0,

      closedDate: '',
      employees: [],
      launchedDate: '',
      locationId: null,
      stocks: [],
      suppliers: [],
      warehouses: [],
    },
    validate: {},
  });

  const handleSubmit = (formValues: ShopFormValues) => {
    createShop(formValues);
    form.reset();
    setSelectedLocation(null);
    employeeHandlers.setState([]);
    suppliersHandlers.setState([]);
    warehousesHandlers.setState([]);
  };

  const { data: employees, filterOptions: employeeFilterOptions } = useEmployeesFilterQuery();
  const { data: suppliers, filterOptions: suppliersFilterOptions } = useSupplierFilterQuery();
  const { filterOptions: locationFilterOptions } = useLocationFilterQuery();
  const { data: warehouses, filterOptions: warehousesFilterOptions } = useWarehouseFilterQuery();

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
            <DateInput
              className="w-full mt-5"
              label="Дата открытия"
              placeholder="Введите дату..."
              {...form.getInputProps('launchedDate')}
            />
            <DateInput
              className="w-full mt-5"
              label="Дата закрытия"
              placeholder="Введите дату..."
              {...form.getInputProps('closedDate')}
            />
          </div>
          <MultiSelectAsync
            placeholder="Сотрудник"
            className="mt-5 w-full flex-7/12"
            options={employeeFilterOptions.nameOptions}
            value={selectedEmployees}
            onChange={payload => {
              employeeHandlers.setState(payload);

              const result = employees
                ?.filter(item => payload.find(value => value.value === item.id))
                .map(item => ({ id: item.id }));

              form.setFieldValue('employees', result || []);
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Город"
            placeholder="Введите город..."
            {...form.getInputProps('city')}
          />

          <NumberInput
            className="w-full mt-5"
            label="Площадь в м^3"
            placeholder="Введите площадь в м^3..."
            {...form.getInputProps('areaValue')}
          />

          <SelectAsync
            placeholder="Местоположение"
            className="mt-5 w-full flex-7/12"
            options={locationFilterOptions.regionOptions}
            value={selectedLocation || null}
            onChange={payload => {
              setSelectedLocation(payload);
              form.setFieldValue('locationId', payload?.value || null);
            }}
          />
        </Grid.Col>
        <Grid.Col>
          <MultiSelectAsync
            placeholder="Склад"
            className="mt-2 w-full flex-7/12"
            options={warehousesFilterOptions.nameOptions}
            value={selectedWarehouses}
            onChange={payload => {
              warehousesHandlers.setState(payload);

              const result = warehouses
                ?.filter(item => payload.find(value => value.value === item.id))
                .map(item => ({ id: item.id }));

              form.setFieldValue('warehouses', result || []);
            }}
          />
          <MultiSelectAsync
            placeholder="Поставщик"
            className="mt-5 w-full flex-7/12"
            options={suppliersFilterOptions.nameOptions}
            value={selectedSuppliers}
            onChange={payload => {
              suppliersHandlers.setState(payload);

              const result = suppliers
                ?.filter(item => payload.find(value => value.value === item.id))
                .map(item => ({ id: item.id }));

              form.setFieldValue('suppliers', result || []);
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
