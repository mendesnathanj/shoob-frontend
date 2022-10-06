import Table from '@/components/ui/Table';
import { useFailedAccessCodeAttemptsData, useFailedAccessCodeAttemptsTableColumns } from './hooks';

export default function FailedAccessCodeAttemptsTable() {
  const columns = useFailedAccessCodeAttemptsTableColumns();
  const { data } = useFailedAccessCodeAttemptsData();

  return (
    <Table columns={columns} data={data} />
  );
}
