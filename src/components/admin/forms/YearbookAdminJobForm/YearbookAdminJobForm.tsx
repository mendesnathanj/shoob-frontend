import { useQuery } from 'react-query';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Form from '../../../ui/Form';
import Input from '../../../ui/Form/Inputs';
import Button from '../../../ui/Button';
import { YearbookAdminJob } from '../../../../models/v2';
import { ONE_DAY } from '../../../../utils/constants';
import YearbookContractDetailFields from './YearbookContractDetailsFields';
import { CONFIRMATION_STATUSES, SCHEMA } from './utils';
import routes from '../../../routes';

type YearbookAdminJobFormProps = {
  id?: string | number;
};

export default function YearbookAdminJobForm({ id }: YearbookAdminJobFormProps) {
  const navigate = useNavigate();

  const { data: yearbookAdminJob } = useQuery(`yearbookAdminJobEdit-${id || 'new'}`, () => {
    if (!id) return new YearbookAdminJob();

    return YearbookAdminJob.includes(['school', 'yearbookContractDetails']).find(id).then((res) => res.data);
  }, { cacheTime: 0, staleTime: ONE_DAY });

  if (!yearbookAdminJob) return null;

  return (
    <Form
      defaultValues={yearbookAdminJob}
      onSubmit={async () => {
        const { yearbookContractDetails, ...newAttributes } = SCHEMA.cast(yearbookAdminJob);
        delete newAttributes.school;

        yearbookAdminJob.attributes = { ...yearbookAdminJob.attributes, ...newAttributes };
        yearbookAdminJob.yearbookContractDetails = yearbookAdminJob
          .yearbookContractDetails
          .map((yearbookContractDetail, i) => {
            if (yearbookContractDetails[i] !== undefined) {
              // eslint-disable-next-line no-param-reassign
              yearbookContractDetail.attributes = yearbookContractDetails[i];
            }

            return yearbookContractDetail;
          });

        const res = await yearbookAdminJob.save({ with: ['school', 'yearbookContractDetails'] });

        if (res) {
          toast('Successfully saved.', { autoClose: 1500, type: 'success' });
          setTimeout(() => navigate(routes.admin.yearbookAdminJobs.show(yearbookAdminJob.id as string)), 1000);
        }
        else {
          toast('Error with form submission.', { autoClose: 1500, transition: Slide, type: 'error' });
        }
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
            <Input containerProps={{ className: 'hidden' }} label="School" name="schoolId" type="hidden" />
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
            contentClass="grid grid-cols-10"
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
