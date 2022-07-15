import { useQuery } from 'react-query';
import { merge } from 'lodash';
import { YearbookAdminJob } from '../../../models/v2';
import routes from '../../routes';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Form/Inputs';
import Link from '../../ui/Link';
import Page from '../../ui/Page';
import { ONE_DAY } from '../../../utils/constants';

export default function YearbookJobs() {
  const { data: yearbookAdminJob } = useQuery('yearbookAdminJobEdit-138', () => (
    YearbookAdminJob
      .includes('yearbookContractDetails')
      .find(138)
      .then((res) => res.data)
  ), { cacheTime: 0, enabled: true, staleTime: ONE_DAY });

  if (!yearbookAdminJob) return null;

  return (
    <Page>
      <Link to={routes.admin.root()}>Admin Page</Link>
      <Form
        className="grid grid-cols-12 gap-y-5"
        defaultValues={yearbookAdminJob}
        onSubmit={async (values) => {
          merge(yearbookAdminJob, values);
          const res = await yearbookAdminJob.save({ with: ['yearbookContractDetails'] });

          console.log(res);
        }}
      >
        <Form.Section
          className="col-span-12"
          collapsible
          contentClass="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Contact Information"
        >
          <Input.Textarea
            label="Fill in details"
            name="details"
          />
          <Input.Date
            label="Promise Date"
            name="promiseDate"
          />
          <Input.Select
            label="School"
            name="schoolId"
            options={[
              { label: 'Enochs', value: 49 },
              { label: 'Gregory', value: 42 },
            ]}
          />
          <Input label="Scode:" name="sCode" />
          <Input label="YB Advisor 1:" name="yearbook_advisor" />
          <Input label="YB Advisor 1 Email:" name="yearbook_advisor" />
        </Form.Section>
        <Form.Section
          className="col-span-12"
          collapsible
          contentClass="grid grid-cols-2 gap-x-8 gap-y-4"
          title="Contract Details"
        >
          <Form.NestedFields
            addText="Add Contract Type"
            buttonProps={{
              className: 'col-span-12'
            }}
            newItemDefaults={{ }}
            scope="yearbookContractDetails"
          >
            <div className="grid grid-cols-2 col-span-12 gap-x-8 gap-y-4">
              <Input.Select
                label="Binding Type"
                name="bindingType"
                options={[
                  { label: 'Soft Cover', value: 'soft_cover' },
                  { label: 'Hard Cover', value: 'hard_cover' },
                  { label: 'Perfect Bound', value: 'perfect_bound' },
                ]}
              />
              <Input label="Presale Price" name="presalePrice" type="number" />
              <Input label="Final Sale Price" name="finalSalePrice" type="number" />
              <Input label="Shipping Cost" name="shipping" type="number" />
              <Input label="Quantity" name="quantity" type="number" step={10} />
              <Input.Checkbox
                labelProps={{
                  className: 'place-self-end'
                }}
                label="Remove?"
                name="isMarkedForDestruction"
              />
              <hr className="col-span-2" />
            </div>
          </Form.NestedFields>
        </Form.Section>
        <div className="pt-3">
          <Button submit variant="primary">Submit</Button>
        </div>
      </Form>
    </Page>
  );
}
