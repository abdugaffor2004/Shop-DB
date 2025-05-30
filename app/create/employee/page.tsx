'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, TextInput } from '@mantine/core';

import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';

import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { EmployeeFormValues } from './types/EmployeeFormValue';
import { useShopsFilterQuery } from '@/app/search/shops/useShopsFilterQuery';
import { useEmployeesFilterQuery } from '@/app/search/employees/useEmployeesFilterQuery';
import { DateInput } from '@mantine/dates';
import { useToggle } from '@mantine/hooks';

const createEmployee = async (data: EmployeeFormValues) => {
  const response = await axios.post(`/api/employees`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateEmployee: FC = () => {
  const [selectedShops, setSelectedShop] = useState<Handbook | null>();
  const [selectedEmployee, setSelectedEmployee] = useState<Handbook | null>();

  const [isPositionEditable, setIsPositionEditable] = useToggle();

  const form = useForm<EmployeeFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      position: '',
      acceptDate: '',
      terminationDate: '',
      email: '',
      phoneNumber: '',
      shopId: null,
    },
    validate: {},
  });

  const handleSubmit = (formValues: EmployeeFormValues) => {
    createEmployee(formValues);
    form.reset();
  };

  const { filterOptions: shopsFilterOptions } = useShopsFilterQuery();
  const { filterOptions: employeeFilterOptions } = useEmployeesFilterQuery();

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[68vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя..."
            {...form.getInputProps('firstName')}
          />

          <DateInput
            className="w-full mt-5"
            label="Дата приема"
            placeholder="Введите дату приема..."
            {...form.getInputProps('acceptDate')}
          />
          <DateInput
            className="w-full mt-5"
            label="Дата увольнения"
            placeholder="Введите дату увольнения..."
            {...form.getInputProps('terminationDate')}
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
              label="Введите email"
              placeholder="example@gmail.com"
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
          <div className="mt-2 flex items-center gap-3">
            {isPositionEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите должность"
                onChange={e => form.setFieldValue('position', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Выберите должность"
                className="w-full flex-7/12"
                options={employeeFilterOptions.positionOptions}
                value={selectedEmployee || null}
                onChange={payload => {
                  setSelectedEmployee(payload);
                  form.setFieldValue('position', payload?.label || '');
                }}
              />
            )}

            <Button onClick={() => setIsPositionEditable()} fz={12} px={7}>
              {isPositionEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>

          <SelectAsync
            placeholder="Магазин"
            className="w-full mt-5 flex-7/12"
            options={shopsFilterOptions.nameOptions}
            value={selectedShops || null}
            onChange={payload => {
              setSelectedShop(payload);
              form.setFieldValue('shopId', payload?.value || '');
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
