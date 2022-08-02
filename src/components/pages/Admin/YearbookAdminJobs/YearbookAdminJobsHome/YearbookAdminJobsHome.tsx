import { useSearchParams } from 'react-router-dom';
import PageSpinner from '@/components/common/PageSpinner';
import Table from '@/components/ui/Table';
import Page from '@/components/ui/Page';
import { useYearbookAdminJobsHome, useYearbookAdminJobTableColumns } from '../utils';
import Filters from './Filters';

export default function YearbookAdminJobsHome() {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useYearbookAdminJobsHome({
    schoolName: searchParams.get('school') || '',
    year: searchParams.get('year') || '2022',
  });
  const columns = useYearbookAdminJobTableColumns();

  return (
    <Page maxWidth="xl">
      <h1 className="text-4xl pb-2 mb-4 border-b border-b-gray-200">Yearbook Jobs</h1>
      <Filters />
      {isLoading ? <PageSpinner /> : <Table data={data} columns={columns} />}
    </Page>
  );
}
