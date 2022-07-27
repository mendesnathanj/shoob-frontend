import { useQuery } from 'react-query';
// import { merge } from 'lodash';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import Button from '../../../ui/Button';
import { YearbookAdminJob } from '../../../../models/v2';
import { ONE_DAY } from '../../../../utils/constants';
import YearbookContractDetailFields from './YearbookContractDetailsFields';
import { CONFIRMATION_STATUSES, SCHEMA } from './utils';

type YearbookAdminJobFormProps = {
  id?: string | number;
};

export default function YearbookAdminJobForm({ id }: YearbookAdminJobFormProps) {
  const { data: yearbookAdminJob } = useQuery(`yearbookAdminJobEdit-${id || 'new'}`, () => {
    if (!id) return new YearbookAdminJob();

    return YearbookAdminJob.includes(['school', 'yearbookContractDetails']).find(id).then((res) => res.data);
  }, { cacheTime: 0, staleTime: ONE_DAY });

  return (
    <Form
      defaultValues={yearbookAdminJob}
      onSubmit={() => {
        console.log('Submitting...');
        // console.log(values);
        // merge(yearbookAdminJob, values);
        // console.log(yearbookAdminJob?.lastday);
        // const res = await yearbookAdminJob?.save({ with: ['yearbookContractDetails'] });

        // console.log(res);
      }}
      schema={SCHEMA}
    >
      <div className="grid grid-cols-12 gap-x-6">
        <div className="grid grid-cols-1 gap-y-14 gap-x-2 col-span-9">
          <Form.Section
            className="col-span-1"
            collapsible
            contentClass="grid grid-cols-3 gap-x-8 gap-y-6"
            title="Contact Information"
          >
            <Input label="YB Advisor Name" name="yearbkadvisor1name" />
            <Input label="YB Advisor Email" name="yearbkadvisor1email" />
            <Input label="YB Advisor Phone Number" name="yearbkadvisor1phone" />
            <Input label="Additional User Name" name="yearbkadvisor2name" />
            <Input label="Additional User Email" name="yearbkadvisor2email" />
            <Input label="Additional User Phone Number" name="yearbkadvisor2phone" />
            <Input label="Enrollment" name="school.enrollment" />
            <Input.Date label="Last Day of School" name="lastday" />
          </Form.Section>
          <Form.Section
            className="col-span-1"
            collapsible
            contentClass="grid grid-cols-3 gap-x-8 gap-y-6"
            title="Contract Details"
          >
            <Input.Select
              label="Confirmation Status"
              name="confirmationStatus"
              options={CONFIRMATION_STATUSES}
            />
            <Input.Select
              label="Custom Setup"
              name="customSetup"
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
            <Input label="Number of pages" name="numberofpages" type="number" />
            <Input.Date label="Presale Deadline" name="presaleDeadline" />
            <Input.Date label="Final Sale Deadline" name="salesdeadline" />
            <Input.Textarea
              containerProps={{ className: 'col-span-3' }}
              label="Notes"
              name="notes"
            />
          </Form.Section>
          <Form.Section
            className="col-span-1"
            contentClass="grid grid-cols-2"
            collapsible
            title="Types of Yearbooks"
          >
            <YearbookContractDetailFields />
          </Form.Section>
        </div>
        <div className="col-span-3">
          <Form.Section contentClass="flex flex-col gap-6" collapsible title="Checklist">
            <Input.Date label="Pixami Setup Date" name="pixamisetupdate" />
            <Input.Date label="Flyers / Posters Sent Date" name="dateflyersposterssenttoprint" />
            <Input.Date label="Flow Class Pictures" name="flowClassPictures" />
            <Input.Date label="Cover Approval" name="coverApproval" />
            <Input.Date label="Submitted YB for Proofing" name="submittedYearbookForProofing" />
            <Input.Date label="Submitted Final YB" name="submittedFinalYearbook" />
          </Form.Section>
        </div>
      </div>
      <div className="pt-3">
        <Button submit variant="primary">Submit</Button>
      </div>
    </Form>
  );
}
