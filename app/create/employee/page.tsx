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
import { EmployeeFormValues } from './types/EmployeeFormValue';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';
import { useEmployeesFilterQuery } from '@/app/search/employees/useEmployeesFilterQuery';

const createEmployee = async (data: EmployeeFormValues) => {
  const response = await axios.post(`/api/employee`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateEmployee: FC = () => {
  const [selectedShop, setSelectedShop] = useState<Handbook | null>();
  const [selectedEmployee, setSelectedEmployee] = useState<Handbook | null>();

  const form = useForm<EmployeeFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName:'',
      position:'',
      acceptDate:'',
      terminationDate:'',
      email:'',
      phonenumber:'',
      shopId :null,
      },
    validate: {},
  });

  const handleSubmit = (formValues: EmployeeFormValues) => {
    createEmployee(formValues);
    form.reset();
  };

  const { data: shops, filterOptions: shopsFilterOptions } = useShopsFilterQuery();
  const { data: employees, filterOptions: employeeFilterOptions } = useEmployeesFilterQuery();

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя..."
            {...form.getInputProps('firstName')}
          />

          
            <TextInput
              className="w-full mt-5"
              label="Дата приема"
              placeholder="Введите дату приема..."
              {...form.getInputProps('acceptDate')}
            />
            <TextInput
              className="w-full mt-5"
              label="Дата увольнения"
              placeholder="Введите дату увольнения..."
              {...form.getInputProps('terminati')}
            />


        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Фамилия"
            placeholder="Введите фамилию..."
            {...form.getInputProps('lastName')}
          />
            <div className="flex-col gap-5">
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
          </div>
        </Grid.Col>
        <Grid.Col>
        <SelectAsync
            placeholder="Выберите должность"
            className="mt-2 w-full flex-7/12"
            options={
                employees
                ? [...new Set(employees.map(employees => employees.position))]
                .map((position) => ({
                value: position, 
                label: position,
          }))
      : []
            }
            value={selectedEmployee || null}
            onChange={(payload) => {
                setSelectedEmployee(payload);
                form.setFieldValue('employeeId', payload?.value || null);
            }}
            />
          <SelectAsync
            placeholder="Магазин"
            className="mt-2 w-full flex-7/12"
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

export default CreateEmployee;
