'use client';

import { Pagination, Table } from '@mantine/core';
import classes from './ShopCountByCityTable.module.css';

import React, { FC } from 'react';
import { usePagination } from '@/app/hooks/usePagination';

export interface ShopCountByCity {
  city: string;
  count: number;
}

interface ShopCountByCityProps {
  data: ShopCountByCity[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const ShopCountByCityTable: FC<ShopCountByCityProps> = ({ data }) => {
  const { currentItems, page, total, setPage } = usePagination<ShopCountByCity>(data);

  const rows = currentItems.map(item => (
    <Table.Tr key={item.city}>
      <Table.Td>{item.city}</Table.Td>
      <Table.Td>{item.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      width="100%"
      horizontalSpacing="20px"
      verticalSpacing="5px"
      highlightOnHover
      className=" mt-3 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="white"
      withRowBorders
    >
      <Table.Thead bg="#4169ee">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Город</Table.Th>
          <Table.Th className="text-[16px] text-white ">Кол-во магазинов</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="sm"
            classNames={{ control: classes.paginationControls }}
            total={total}
            value={page}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </Table.Caption>
    </Table>
  );
};

export default ShopCountByCityTable;
