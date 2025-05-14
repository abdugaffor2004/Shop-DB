'use client';

import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './ShopsTable.module.css';

import React, { FC } from 'react';
import { useToggle } from '@mantine/hooks';
import { Shop } from '@/app/search/shops/types/Shop';
import { usePagination } from '@/app/hooks/usePagination';

interface ShopsTableProps {
  data: Shop[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const ShopsTable: FC<ShopsTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Shop>(data);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.launchedDate ? item.launchedDate : '-'}</Table.Td>
      <Table.Td>{item.closedDate ? item.closedDate : '-'}</Table.Td>
      <Table.Td>{item.city}</Table.Td>
      <Table.Td>{item.location ? item.location.region : '-'}</Table.Td>
      <Table.Td>{item.areaValue.toFixed()}</Table.Td>
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
      horizontalSpacing="25px"
      verticalSpacing="15px"
      highlightOnHover
      className=" mt-8 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="white"
      withRowBorders
    >
      <Table.Thead bg="#4169e2">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Название</Table.Th>
          <Table.Th className="text-[16px] text-white ">Дата открытия</Table.Th>
          <Table.Th className="text-[16px] text-white ">Дата закрытия</Table.Th>
          <Table.Th className="text-[16px] text-white ">Город</Table.Th>
          <Table.Th className="text-[16px] text-white ">Область</Table.Th>
          <Table.Th className="text-[16px] text-white ">Площадь</Table.Th>
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

export default ShopsTable;
