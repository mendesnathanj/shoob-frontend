import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { YearbookAdminJob } from '@/models/v2';
import routes from '@/routes';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';

type FormData = {
  year: number;
};

export default function Filters() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { data = [] } = useQuery('yearbookAdminJobHomeFilters', () => (
    YearbookAdminJob
      .selectExtra(['years'])
      .first()
      .then((res) => (res.data?.years || []))
  ));

  const onSubmit = (values: FormData) => {
    navigate({
      pathname: routes.admin.yearbookAdminJobs.home(),
      search: qs.stringify(values, { skipEmptyString: true })
    });
  };

  return (
    <Form
      autoSave={{ delay: 250 }}
      className="grid grid-cols-12 gap-4 py-4"
      defaultValues={{
        school: searchParams.get('school') || '',
        year: parseInt(searchParams.get('year') || '', 10) || 2023
      }}
      onSubmit={onSubmit}
    >
      <Input
        containerProps={{
          className: 'col-span-3'
        }}
        className="max-w-full"
        label="School"
        name="school"
      />
      <Input.Select
        containerProps={{
          className: 'col-span-2'
        }}
        label="Filter by Year"
        name="year"
        options={data.map((year) => ({
          label: `${year} - ${year + 1}`,
          value: year
        }))}
      />
    </Form>
  );
}
