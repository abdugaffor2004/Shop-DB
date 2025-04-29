'use client';

import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './SuppliersTable.module.css';
import React, { FC } from 'react';
import { useToggle } from '@mantine/hooks';
import { usePagination } from '@/app/hooks/usePagination';
import { Stocks } from '@/app/search/stocks/types/Stocks';

interface StocksTableProps {
  data: Stocks[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const StocksTable: FC<StocksTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Stocks>(data);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.shop.name}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{item.startDate}</Table.Td>
      <Table.Td>{item.endDate}</Table.Td>
      <Table.Td>{item.discountPercentage}</Table.Td>
      {withDelete && isEditable && (
        <Table.Td p={10}>
          <ActionIcon color="red" variant="subtle" onClick={() => deleteRows?.(item.id)}>
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table
      horizontalSpacing="20px"
      verticalSpacing="16px"
      highlightOnHover
      className=" mt-8 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="white"
      withRowBorders
    >
      <Table.Thead bg="#4169e2">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Магазин</Table.Th>
          <Table.Th className="text-[16px] text-white ">Название акции</Table.Th>
          <Table.Th className="text-[16px] text-white ">Начало</Table.Th>
          <Table.Th className="text-[16px] text-white ">Конец</Table.Th>
          <Table.Th className="text-[16px] text-white ">Проценты</Table.Th>
          <Table.Th px={10} className="w-[40px]">
            <ActionIcon onClick={() => setIsEditable()} variant="subtle" color="white">
              {!isEditable ? <IconEdit /> : <IconChecks />}
            </ActionIcon>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="md"
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

export default StocksTable;
