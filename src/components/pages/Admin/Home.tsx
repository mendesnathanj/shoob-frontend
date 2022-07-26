import routes from '../../routes';
import Link from '../../ui/Link';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <Link external to={routes.customer.home()}>Home</Link>
      <Link to={routes.admin.yearbookAdminJobs.home()}>Yearbook Jobs</Link>
      <Link to={routes.admin.products.home()}>Products Page</Link>
    </Page>
  );
}
