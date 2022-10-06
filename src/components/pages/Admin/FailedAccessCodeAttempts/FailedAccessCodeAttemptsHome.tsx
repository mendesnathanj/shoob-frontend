import Page from '@/components/ui/Page';
import FailedAccessCodeAttemptsTable from '@/components/admin/forms/FailedAccessCodeAttemptsTable';

export default function FailedAccessCodeAttemptsHome() {
  return (
    <Page maxWidth="xl">
      <h1 className="text-2xl font-display pb-1 mb-5 border-b border-b-gray-200">Failed Access Code Attempts</h1>
      <FailedAccessCodeAttemptsTable />
    </Page>
  );
}
