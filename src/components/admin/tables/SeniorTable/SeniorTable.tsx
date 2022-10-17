import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import Spinner from '@/components/ui/Spinner';
import { usePhotoSectionTableColumns } from '@/hooks/tables/useSeniorTable';
import SeniorTableFilters from './SeniorTableFilters';

const PAGE_SIZE = 25;

interface SeniorTableProps {
  schoolId: number;
}

export default function SeniorTable({ schoolId }: SeniorTableProps) {
  const pageCount = useSeniorPageCount(schoolId, PAGE_SIZE);
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize: PAGE_SIZE });

  const { data: students = [], isFetching } =
    useSeniorsWithYearbookPoses(schoolId, pageIndex + 1, PAGE_SIZE);

  const columns = usePhotoSectionTableColumns();

  return (
    <Section title="Photos">
      <SeniorTableFilters />
      <div className="flex justify-between min-w-full">
        <div>
          <button onClick={() => setPage(Math.max(pageIndex - 1, 0))} type="button">Page - 1</button>
          <span className="px-6">{pageIndex}</span>
          <button onClick={() => setPage(pageIndex + 1)} type="button">Page + 1</button>
        </div>
        {isFetching && <Spinner className="opacity-30 w-6 h-6" color="gray" size="sm" />}
      </div>
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
