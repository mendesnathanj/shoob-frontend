import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import Spinner from '@/components/ui/Spinner';
import { usePhotoSectionTableColumns } from '@/hooks/tables/useSeniorTable';

const pageSize = 25;

export default function SeniorTable() {
  const { user } = useAuth();
  const pageCount = useSeniorPageCount((user as User).schoolId, pageSize);
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize });

  const { data: students = [], isFetching } =
    useSeniorsWithYearbookPoses((user as User).schoolId, pageIndex + 1, pageSize);

  const columns = usePhotoSectionTableColumns();

  return (
    <Section title="Photos">
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
