'use client';

import { Pagination, Table } from '@mantine/core';
import classes from './ShopCountByLocationTable.module.css';

import React, { FC } from 'react';
import { usePagination } from '@/app/hooks/usePagination';

export interface ShopCountByLocation {
  location: string;
  count: number;
}

interface ShopCountByLocationProps {
  data: ShopCountByLocation[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const ShopCountByLocationTable: FC<ShopCountByLocationProps> = ({ data }) => {
  const { currentItems, page, total, setPage } = usePagination<ShopCountByLocation>(data);

  const rows = currentItems.map(item => (
    <Table.Tr key={item.location}>
      <Table.Td>{item.location}</Table.Td>
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
      <Table.Thead bg="#4169e2">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Область</Table.Th>
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

export default ShopCountByLocationTable;
