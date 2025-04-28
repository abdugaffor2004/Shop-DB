'use client';
import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPageCount: number = 6) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageCount);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);
  const total = Math.ceil(data?.length / itemsPerPage);
  return {
    currentItems,
    page,
    itemsPerPage,
    total,
    setPage,
    setItemsPerPage,
  };
}
