import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
// import { merge } from 'lodash';
import Form from '../../../ui/Form';
import Page from '../../../ui/Page';
import Input from '../../../ui/Form/Inputs';
import Button from '../../../ui/Button';
import { YearbookAdminJob } from '../../../../models/v2';
import { ONE_DAY } from '../../../../utils/constants';
import routes from '../../../routes';
import YearbookContractDetailFields from './YearbookContractDetailsFields';
import { SCHEMA } from './utils';

type YearbookAdminJobFormProps = {
  id?: string | number;
};

export default function YearbookAdminJobForm({ id }: YearbookAdminJobFormProps) {
  const { data: yearbookAdminJob } = useQuery(`yearbookAdminJobEdit-${id || 'new'}`, () => {
    if (!id) return new YearbookAdminJob();

    return YearbookAdminJob.includes('yearbookContractDetails').find(id).then((res) => res.data);
  }, { cacheTime: 0, staleTime: ONE_DAY });

  return (
    <Page isLoading={!yearbookAdminJob}>
      <Link to={routes.admin.root()}>Admin Page</Link>
      <Form
        className="grid grid-cols-12 gap-y-5"
        defaultValues={yearbookAdminJob}
        onSubmit={async (values) => {
          console.log(values);
          // merge(yearbookAdminJob, values);
          // const res = await yearbookAdminJob?.save({ with: ['yearbookContractDetails'] });

          // console.log(res);
        }}
        schema={SCHEMA}
      >
        <Form.Section
          className="col-span-12"
          collapsible
          contentClass="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Contact Information"
        >
          <Input.Select
            label="School"
            name="schoolId"
            options={[
              { label: 'Enochs', value: 49 },
              { label: 'Gregory', value: 42 },
            ]}
          />
          <Input label="YB Advisor 1:" name="yearbook_advisor" />
          <Input label="YB Advisor 1 Email:" name="yearbook_advisor" />
        </Form.Section>
        <Form.Section
          className="col-span-12"
          collapsible
          title="Contract Details"
        >
          <YearbookContractDetailFields />
        </Form.Section>
        <div className="pt-3">
          <Button submit variant="primary">Submit</Button>
        </div>
      </Form>
    </Page>
  );
}
