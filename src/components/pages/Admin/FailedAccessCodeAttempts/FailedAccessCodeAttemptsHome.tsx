import Page from '@/components/ui/Page';
import FailedAccessCodeAttemptsTable from '@/components/admin/forms/FailedAccessCodeAttemptsTable';
import Link from '@/components/ui/Link';

export default function FailedAccessCodeAttemptsHome() {
  return (
    <Page maxWidth="xl">
      <Link external openInNewTab to="https://shoobphoto.com/admin/dashboards">
        Dashboard
      </Link>
      <h1 className="text-2xl font-display pb-1 mb-5 border-b border-b-gray-200">Failed Access Code Attempts</h1>
      <FailedAccessCodeAttemptsTable />
    </Page>
  );
}
