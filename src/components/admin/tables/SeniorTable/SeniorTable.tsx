import { useEffect } from 'react';
import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import { usePhotoSectionTableColumns } from '@/hooks/tables/useSeniorTable';
import SeniorTableFilters from './SeniorTableFilters';
import useRouteQuery from '@/hooks/useRouteQuery';

const PAGE_SIZE = 25;

interface SeniorTableProps {
  schoolId: number;
}

export default function SeniorTable({ schoolId }: SeniorTableProps) {
  const pageCount = useSeniorPageCount(schoolId, PAGE_SIZE);
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize: PAGE_SIZE });
  const query = useRouteQuery();

  const queryParams = {
    firstName: query.get('firstName'),
    lastName: query.get('lastName'),
    studentId: query.get('studentId'),
  };

  useEffect(() => setPage(0), [query.get('firstName'), query.get('lastName'), query.get('studentId')]);

  const { data: students = [], isFetching } =
    useSeniorsWithYearbookPoses(schoolId, pageIndex + 1, PAGE_SIZE, queryParams);

  const columns = usePhotoSectionTableColumns();

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
