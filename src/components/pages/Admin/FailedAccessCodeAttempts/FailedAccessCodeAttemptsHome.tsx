import Page from '@/components/ui/Page';
import FailedAccessCodeAttemptsTable from '@/components/admin/tables/FailedAccessCodeAttemptsTable';
import Link from '@/components/ui/Link';
import { useTotalUnprocessedFailedAttempts } from '@/hooks/pages/FailedAccessCodeAttempts/useHomeHooks';

export default function FailedAccessCodeAttemptsHome() {
  const { data: count, isLoading } = useTotalUnprocessedFailedAttempts();

  return (
    <Page maxWidth="xl">
      <Link external openInNewTab to="https://shoobphoto.com/admin/dashboards">
        Dashboard
      </Link>
      <div className="flex justify-between min-w-full border-b border-b-gray-200 pb-1 mb-5">
        <h1 className="text-2xl font-display">Failed Access Code Attempts</h1>
        <span>{!isLoading && `Total unprocessed: ${count}`}</span>
      </div>
      <FailedAccessCodeAttemptsTable />
    </Page>
  );
}
