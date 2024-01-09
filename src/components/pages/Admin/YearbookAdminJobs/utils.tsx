import { ColumnDef } from '@tanstack/react-table';
import { capitalize } from 'lodash';
import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { YearbookAdminJob, YearbookContractDetail } from '@/models/v2';
import routes from '@/routes';
import Link from '@/components/ui/Link';
import DeleteButton from './DeleteButton';

type useYearbookAdminJobsHomeProps = {
  schoolName: string;
  year?: string | number;
};

export function useYearbookAdminJobsHome({ schoolName, year }: useYearbookAdminJobsHomeProps) {
  const { data, isLoading } = useQuery(['yearbookAdminJobsHome', year, schoolName], () => (
    YearbookAdminJob
      .includes(['school'])
      .where({ schoolName, year })
      .order('name')
      .per(150)
      .select({
        schools: ['name', 'scode'],
        yearbookAdminJobs: ['year', 'confirmationStatus', 'yearbkadvisor1name']
      })
      .all()
      .then((res) => res.data)
  ), { enabled: !!year });

  return { data, isLoading };
}

export function useYearbookAdminJobTableColumns() {
  const queryClient = useQueryClient();

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
    { accessorKey: 'yearbkadvisor1name', header: 'Yearbook Advisor', id: 'yearbookAdvisor' },
    { accessorFn: (row) => `${row.year} - ${row.year + 1}`, accessorKey: 'year', header: 'Year', id: 'year' },
    {
      accessorFn: (row) => {
        if (row.confirmationStatus) return capitalize(row.confirmationStatus);

        return 'Null';
      },
      accessorKey: 'confirmationStatus',
      header: 'Confirmation Status',
      id: 'confirmationStatus'
    },
    {
      accessorKey: 'delete',
      cell: (props) => (
        <DeleteButton id={props.row.original.id as string} onSuccess={() => queryClient.invalidateQueries({ queryKey: ['yearbookAdminJobsHome'] })} />
      ),
      header: 'Delete',
    }
  ]), []);
}

export function useYearbookAdminJob(id: string) {
  return useQuery(['yearbookAdminJob', id], () => {
    const yearbookContractDetailScope = YearbookContractDetail
      .selectExtra(['quantitySoldOnWebsite']);

    return (
      YearbookAdminJob
        .includes([{ school: ['district', 'schoolType'] }, 'yearbookContractDetails'])
        .merge({ yearbookContractDetails: yearbookContractDetailScope })
        .find(id)
        .then((res) => res.data)
    );
  });
}
