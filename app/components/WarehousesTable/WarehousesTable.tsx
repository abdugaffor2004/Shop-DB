'use client';

import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './WarehousesTable.module.css';
import React, { FC } from 'react';
import { useToggle } from '@mantine/hooks';
import { usePagination } from '@/app/hooks/usePagination';
import { Warehouse } from '@/app/search/warehouses/types/Warehouses';

interface WarehouseTableProps {
  data: Warehouse[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const WarehouseTable: FC<WarehouseTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Warehouse>(data);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.size}</Table.Td>
      <Table.Td>{item.lastDepositDate}</Table.Td>
      <Table.Td>{item.products.length}</Table.Td>
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
          <Table.Th className="text-[16px] text-white ">Название склада</Table.Th>
          <Table.Th className="text-[16px] text-white ">Размер м^3</Table.Th>
          <Table.Th className="text-[16px] text-white ">Дата последнего пополнения</Table.Th>
          <Table.Th className="text-[16px] text-white ">Кол-во товаров на складе</Table.Th>
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

export default WarehouseTable;
