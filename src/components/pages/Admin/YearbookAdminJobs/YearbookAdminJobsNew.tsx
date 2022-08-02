import Link from '@/components/ui/Link';
import Page from '@/components/ui/Page';
import routes from '@/routes';
import YearbookAdminJobForm from '../../../admin/forms/YearbookAdminJobForm';

export default function YearbookAdminJobsNew() {
  return (
    <Page maxWidth="xl">
      <Link className="inline-block mb-4" to={routes.admin.yearbookAdminJobs.home()}>Back</Link>
      <YearbookAdminJobForm />
    </Page>
  );
}
