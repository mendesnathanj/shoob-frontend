import Page from '@/components/ui/Page';
import FailedAccessCodeAttemptsTable from '@/components/admin/forms/FailedAccessCodeAttemptsTable';

export default function FailedAccessCodeAttemptsHome() {
  return (
    <Page maxWidth="xl">
      FailedAccessCodeAttemptsHome Page
      <FailedAccessCodeAttemptsTable />
    </Page>
  );
}
