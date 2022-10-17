import { useLocation, useNavigate } from 'react-router';
import qs from 'query-string';
import Section from '@/components/common/Section';
import { useSeniorPageCount, useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import Table from '@/components/ui/Table';
import { useTablePagination } from '@/components/ui/Table/tableHooks';
import Spinner from '@/components/ui/Spinner';
import { usePhotoSectionTableColumns } from '@/hooks/tables/useSeniorTable';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import Button from '@/components/ui/Button';

const PAGE_SIZE = 25;

interface SeniorTableProps {
  schoolId: number;
}

export default function SeniorTable({ schoolId }: SeniorTableProps) {
  const pageCount = useSeniorPageCount(schoolId, PAGE_SIZE);

  const navigate = useNavigate();
  const location = useLocation();
  const { pageIndex, setPage, tableOptions } = useTablePagination({ pageCount, pageSize: PAGE_SIZE });

  const { data: students = [], isFetching } =
    useSeniorsWithYearbookPoses(schoolId, pageIndex + 1, PAGE_SIZE);

  const columns = usePhotoSectionTableColumns();

  return (
    <Section title="Photos">
      <div className="flex justify-between min-w-full">
        <Form
          className="grid grid-cols-3 gap-4 ml-auto"
          onSubmit={(values) => {
            navigate({
              pathname: location.pathname,
              search: qs.stringify(values, { skipEmptyString: true })
            });
          }}
        >
          <Input label="Student ID" name="studentId" />
          <Input label="Student Name" name="studentName" />
          <Button className="place-self-end" fullWidth submit variant="primary">Search</Button>
        </Form>
      </div>
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
