import { useQuery } from 'react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { formattedDateTime, titleize } from '@/utils/functions';
import { FailedAccessCodeAttempt } from '@/models/v2';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { queryClient } from '@/utils/constants';

export function useFailedAccessCodeAttemptsTableColumns() {
  return useMemo<ColumnDef<FailedAccessCodeAttempt>[]>(() => ([
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'email',
      className: '!text-left pl-4',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'studentFirstName',
      header: 'First Name',
    },
    {
      accessorKey: 'studentLastName',
      header: 'Last Name',
    },
    {
      accessorFn: (row) => row?.school?.name || '',
      className: 'whitespace-nowrap',
      header: 'School',
    },
    {
      accessorKey: 'grade',
      header: 'Grade',
    },
    {
      accessorFn: (row) => formattedDateTime(row.createdAt, 'client', true),
      className: 'whitespace-nowrap',
      header: 'First Created',
    },
    {
      accessorFn: (row) => formattedDateTime(row.updatedAt, 'client', true),
      className: 'whitespace-nowrap',
      header: 'Last Updated',
    },
    {
      cell: ({ row: { original } }) => {
        const handleClick = () => {
          original.status = original.status === 'processed' ? 'not_processed' : 'processed';

          original
            .save()
            .then(() => queryClient.invalidateQueries('failedAccessCodeAttempts'));
        };

        return (
          <Tooltip label={`Mark as ${original.status === 'processed' ? 'Not Processed' : 'Processed'}`}>
            <Button onClick={handleClick} variant={original.status === 'processed' ? 'success' : 'base'}>
              {titleize(original.status)}
            </Button>
          </Tooltip>
        );
      },
      header: 'Status',
    }
  ]), []);
}

export function useFailedAccessCodeAttemptsData() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ [key: number]: FailedAccessCodeAttempt[] }>({});

  const queryResults = useQuery(['failedAccessCodeAttempts', page], () => (
    FailedAccessCodeAttempt
      .includes(['school'])
      .order({ status: 'asc' })
      .order({ id: 'asc' })
      .page(page)
      .all()
      .then((res) => {
        if (res.data.length === 0) return;

        setPage((prev) => prev + 1);
        setData((prev) => ({ ...prev, [page]: res.data }));
      })
  ), { keepPreviousData: true, refetchOnMount: false, refetchOnReconnect: false });

  return { ...queryResults, data: Object.values(data).flat() };
}
