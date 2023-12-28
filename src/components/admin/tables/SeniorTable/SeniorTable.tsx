import { useEffect, useMemo } from 'react';
import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import { usePhotoSectionTableColumns } from '@/hooks/tables/useSeniorTable';
import SeniorTableFilters from './SeniorTableFilters';
import useRouteQuery from '@/hooks/useRouteQuery';
import Modal from '@/components/ui/Modal';

const PAGE_SIZE = 25;

interface SeniorTableProps {
  isAdmin?: boolean;
  schoolId: number;
}

export default function SeniorTable({ isAdmin, schoolId }: SeniorTableProps) {
  const pageCount = useSeniorPageCount(schoolId, PAGE_SIZE);
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize: PAGE_SIZE });
  const query = useRouteQuery();

  const scope = useMemo(() => {
    switch (query.get('scope')) {
      case 'photographed':
        return 'photographed_seniors';
      case 'appointments':
        return 'with_future_appointments';
      case 'with_pose':
        return 'seniors_with_yearbook_pose';
      default:
        return 'enrolled_seniors';
    }
  }, [query.get('scope')]);

  const queryParams = {
    firstName: query.get('firstName'),
    lastName: query.get('lastName'),
    [scope]: true,
    studentId: query.get('studentId'),
  };

  useEffect(
    () => setPage(0),
    [query.get('firstName'), query.get('lastName'), query.get('studentId'), query.get('scope')]
  );

  const { data: students = [], isFetching } =
    useSeniorsWithYearbookPoses(schoolId, pageIndex + 1, PAGE_SIZE, queryParams);

  const columns = usePhotoSectionTableColumns({ isAdmin });

  return (
    <Section title="Photos">
      <SeniorTableFilters isLoading={isFetching} pageIndex={pageIndex} setPage={setPage} />
      <div className="flex flex-wrap gap-y-4">
        <Table
          columns={columns}
          data={students}
          {...tableOptions}
        />
      </div>
    </Section>
  );
}
