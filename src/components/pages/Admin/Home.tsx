import { Outlet } from 'react-router-dom';
import routes from '../../routes';
import Link from '../../ui/Link';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <Link external to={routes.customer.home()}>Home</Link>
      <Link to={routes.admin.yearbookJobs()}>Yearbook Jobs</Link>
      <Outlet />
    </Page>
  );
}
