import { useMemo } from 'react';
import Page from '@/components/ui/Page';
import Link from '@/components/ui/Link';
import routes from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';
import SeniorTable from '../../../admin/tables/SeniorTable';
import ActionSection from './ActionSection';
import SeniorStatisticsSection from './SeniorStatisticsSection';
import useRouteQuery from '@/hooks/useRouteQuery';

export default function SeniorStatus() {
  const { user } = useAuth();
  const query = useRouteQuery();

  const schoolIdQuery = query.get('schoolId');

  const schoolId = useMemo(() => {
    if ((user as User).isAdmin()) {
      if (typeof schoolIdQuery === 'string') return parseInt(schoolIdQuery, 10);

      return (user as User).schoolId;
    }

    return (user as User).schoolId;
  }, [schoolIdQuery]);

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
