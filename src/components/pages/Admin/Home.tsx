import { Link, Outlet } from 'react-router-dom';
import routes from '../../routes';
import Page from '../../ui/Page';

export default function Home() {
  return (
    <Page>
      <Link to={routes.admin.yearbookJobs()}>Yearbook Jobs</Link>
      <Outlet />
    </Page>
  );
}
