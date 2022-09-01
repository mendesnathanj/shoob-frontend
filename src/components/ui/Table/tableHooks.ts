import { PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

type useTablePaginationArgs = {
  pageCount?: number;
  pageSize?: number;
};

export function useTablePagination({
  pageCount = -1, pageSize: defaultPageSize = 25
}: useTablePaginationArgs = { pageCount: -1, pageSize: 25 }) {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const setPage = (page: number) => {
    setPagination({
      pageIndex: page,
      pageSize,
    });
  };

  const pagination = useMemo(() => ({
    pageIndex,
    pageSize,
  }), [pageIndex, pageSize]);

  return {
    pageIndex,
    setPage,
    tableOptions: {
      manualPagination: true,
      onPaginationChange: setPagination,
      pageCount,
      state: {
        pagination,
      },
    }
  };
}
