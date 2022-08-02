import { useParams } from 'react-router';
import YearbookAdminJobForm from '../../../admin/forms/YearbookAdminJobForm';
import routes from '../../../../routes';
import Link from '../../../ui/Link';
import Page from '../../../ui/Page';

export default function YearbookAdminJobEdit() {
  const { id } = useParams();

  return (
    <Page maxWidth="xl">
      <Link className="inline-block mb-4" to={routes.admin.yearbookAdminJobs.show(id as string)}>Back</Link>
      <YearbookAdminJobForm id={id} />
    </Page>
  );
}
