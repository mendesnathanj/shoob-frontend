import routes from '../../../routes';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';

export default function YearbookAdminJobsHome() {
  return (
    <Page>
      <Link to={routes.admin.yearbookAdminJobs.new()}>New Yearbook Job</Link>
      <Link to={routes.admin.yearbookAdminJobs.edit(138)}>Edit 138</Link>
    </Page>
  );
}
