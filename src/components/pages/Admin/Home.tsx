import routes from '@/routes';
import Link from '@/components/ui/Link';
import Page from '@/components/ui/Page';

export default function Home() {
  return (
    <Page>
      <Link external to={routes.customer.home()}>Home</Link>
      <Link to={routes.admin.yearbookAdminJobs.home()}>Yearbook Jobs</Link>
      <Link to={routes.admin.products.home()}>Products Page</Link>
      <Link to={routes.admin.seniorStatus()}>Senior Status</Link>
      <Link to={routes.admin.failedAccessCodeAttempts.home()}>Failed Access Code Attempts</Link>
    </Page>
  );
}
