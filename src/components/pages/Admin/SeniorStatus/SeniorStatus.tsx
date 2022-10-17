import Page from '@/components/ui/Page';
import Link from '@/components/ui/Link';
import routes from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';
import SeniorTable from '../../../admin/tables/SeniorTable';
import useQueryString from '@/hooks/useQueryString';
import ActionSection from './ActionSection';
import SeniorStatisticsSection from './SeniorStatisticsSection';

export default function SeniorStatus() {
  const { user } = useAuth();
  const queryString = useQueryString();

  const schoolId = (queryString.schoolId || (user as User).schoolId) as number;

  return (
    <Page className="flex flex-col gap-12" maxWidth="2xl">
      <Link external to={routes.external.home()}>
        To Shoob
      </Link>
      <ActionSection schoolId={schoolId} />
      <SeniorStatisticsSection schoolId={schoolId} />
      <SeniorTable schoolId={schoolId} />
    </Page>
  );
}
