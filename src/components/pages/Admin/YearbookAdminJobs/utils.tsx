import { ColumnDef } from '@tanstack/react-table';
import { capitalize } from 'lodash';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { YearbookAdminJob } from '../../../../models/v2';
import routes from '../../../routes';
import Link from '../../../ui/Link';

type useYearbookAdminJobsHomeProps = {
  schoolName: string;
  year: string;
};

export function useYearbookAdminJobsHome({ schoolName, year }: useYearbookAdminJobsHomeProps) {
  const { data, isLoading } = useQuery(['yearbookAdminJobsHome', year, schoolName], () => (
    YearbookAdminJob
      .includes(['school'])
      .where({ schoolName, year })
      .order('name')
      .per(150)
      .all()
      .then((res) => res.data)
  ));

  const memoizedData = useMemo(() => data || [], [isLoading, schoolName, year]);

  return { data: memoizedData, isLoading };
}

export function useYearbookAdminJobTableColumns() {
  return useMemo<ColumnDef<YearbookAdminJob>[]>(() => ([
    {
      cell: (props) => (
        <Link to={routes.admin.yearbookAdminJobs.show(props.row.original.id as string)}>
          View
        </Link>
      ),
      header: '',
      id: 'actions',
    },
    {
      accessorFn: (row) => row.school.name,
      accessorKey: 'school',
      className: '!text-left pl-4',
      header: 'School',
      id: 'school'
    },
    { accessorFn: (row) => row.school.scode, accessorKey: 'school', header: 'Scode', id: 'scode' },
    { accessorFn: () => 'TODO:', accessorKey: '', header: 'Yearbook Advisor', id: 'yearbookAdvisor' },
    { accessorFn: (row) => `${row.year} - ${row.year + 1}`, accessorKey: 'year', header: 'Year', id: 'year' },
    {
      accessorFn: (row) => {
        if (row.confirmationStatus) return capitalize(row.confirmationStatus);

        return '';
      },
      accessorKey: 'confirmationStatus',
      header: 'Confirmation Status',
      id: 'confirmationStatus'
    },
  ]), []);
}
