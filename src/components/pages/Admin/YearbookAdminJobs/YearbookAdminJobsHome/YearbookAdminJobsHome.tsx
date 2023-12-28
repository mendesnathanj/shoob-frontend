import { useSearchParams } from 'react-router-dom';
import PageSpinner from '@/components/common/PageSpinner';
import Table from '@/components/ui/Table';
import Page from '@/components/ui/Page';
import { useYearbookAdminJobsHome, useYearbookAdminJobTableColumns } from '../utils';
import Filters from './Filters';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import routes from '@/routes';
import { useQuery } from 'react-query';
import { YearbookAdminJob } from '@/models/v2';

export default function YearbookAdminJobsHome() {
  const [searchParams] = useSearchParams();

  const { data: years = [] } = useQuery('yearbookAdminJobHomeFilters', () => (
    YearbookAdminJob
      .selectExtra(['years'])
      .first()
      .then((res) => (res.data?.years || []))
  ));

  const { data, isLoading } = useYearbookAdminJobsHome({
    schoolName: searchParams.get('school') || '',
    year: searchParams.get('year') || years[0],
  });
  const columns = useYearbookAdminJobTableColumns();

  return (
    <Page maxWidth="xl">
      <div className="flex justify-between border-b border-b-gray-200">
        <h1 className="text-4xl pb-2 mb-4">Yearbook Jobs</h1>
        <Link to={routes.admin.yearbookAdminJobs.new()}>
          <Button variant="primary">Add New Job</Button>
        </Link>
      </div>
      <Filters />
      {isLoading ? <PageSpinner /> : <Table data={data} columns={columns} />}
    </Page>
  );
}
