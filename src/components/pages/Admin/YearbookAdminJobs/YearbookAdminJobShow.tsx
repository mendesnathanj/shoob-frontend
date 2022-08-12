import { useParams } from 'react-router';
import cn from 'classnames';
import currency from 'currency.js';
import { capitalize, formattedDate, formattedDateTime } from '@/utils/functions';
import Section from '@/components/common/Section';
import routes from '@/routes';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import Page from '@/components/ui/Page';
import { useYearbookAdminJob } from './utils';

function Item({ className = '', label, value }: { className?: string, label: string, value?: string | number }) {
  return (
    <div className={cn('col-span-1', className)}>
      <p className="font-semibold">{label}</p>
      <p className="break-words">{value || 'N/A'}</p>
    </div>
  );
}

export default function YearbookAdminJobShow() {
  const { id } = useParams<{ id: string }>();
  const { data: yearbookAdminJob, isLoading } = useYearbookAdminJob(id as string);

  return (
    <Page maxWidth="xl" isLoading={isLoading}>
      <Link className="inline-block mb-4" to={routes.admin.yearbookAdminJobs.home()}>All Yearbook Jobs</Link>
      <h1 className="text-3xl font-display mb-6">Yearbook Job for {yearbookAdminJob?.school.name}</h1>
      {yearbookAdminJob && (
        <div className="grid grid-cols-12 gap-x-5">
          <div className="grid gap-y-14 gap-x-2 col-span-9">
            <Section title="Actions">
              <Link to={routes.admin.yearbookAdminJobs.edit(yearbookAdminJob.id)} variant="plain">
                <Button outlined variant="primary">
                  Edit
                </Button>
              </Link>
            </Section>
            <Section title="School Information" contentClass="grid grid-cols-5 gap-y-4">
              <Item label="Scode" value={yearbookAdminJob.school.scode} />
              <Item label="District" value={yearbookAdminJob.school.district.name} />
              <Item label="Type of School" value={yearbookAdminJob.school.schoolType.name} />
              <Item label="Phone" value={yearbookAdminJob.school.phone} />
              <Item label="Route" value={yearbookAdminJob.school.route} />
              <Item
                label="Principal"
                value={`${yearbookAdminJob.school.prinFname} ${yearbookAdminJob.school.prinLname}`}
              />
              <Item label="Principal Email" value={yearbookAdminJob.school.prinEmail} />
              <Item
                className="col-start-4"
                label="Secretary"
                value={`${yearbookAdminJob.school.sec1Fname} ${yearbookAdminJob.school.sec1Lname}`}
              />
              <Item label="Secretary Email" value={yearbookAdminJob.school.sec1Email} />
            </Section>
            <Section title="Contact Information" contentClass="grid grid-cols-3 gap-y-6 gap-x-2">
              <Item label="YB Advisor Name:" value={yearbookAdminJob.yearbkadvisor1name} />
              <Item label="YB Advisor Email:" value={yearbookAdminJob.yearbkadvisor1email} />
              <Item label="YB Advisor Phone Number:" value={yearbookAdminJob.yearbkadvisor1phone} />
              <Item label="Additional User Name:" value={yearbookAdminJob.yearbkadvisor2name} />
              <Item label="Additional User Email:" value={yearbookAdminJob.yearbkadvisor2email} />
              <Item label="Additional User Phone Number:" value={yearbookAdminJob.yearbkadvisor2phone} />
              <Item label="Enrollment:" value={yearbookAdminJob.school.enrollment} />
              <Item label="Last Day of School:" value={formattedDate(yearbookAdminJob.lastday)} />
            </Section>
            <Section title="Contract Details" contentClass="grid grid-cols-3 gap-y-6 gap-x-2">
              <Item label="Confirmation Status:" value={capitalize(yearbookAdminJob.confirmationStatus || 'null')} />
              <Item label="Custom Setup:" value={yearbookAdminJob.customSetup ? 'Yes' : 'No'} />
              <Item
                label="Types of Binding"
                value={yearbookAdminJob.formattedBindingTypes()}
              />
              <Item label="Number of Pages:" value={yearbookAdminJob.numberofpages} />
              <Item label="Presale Deadline:" value={formattedDate(yearbookAdminJob.presaleDeadline)} />
              <Item label="Final Sale Deadline:" value={formattedDate(yearbookAdminJob.salesdeadline)} />
              <Item className="col-span-2" label="Notes:" value={yearbookAdminJob.notes} />
            </Section>
            {yearbookAdminJob.yearbookContractDetails.map((contractDetail) => (
              <Section
                contentClass="grid grid-flow-col grid-rows-3 gap-y-6 gap-x-2"
                key={contractDetail.id}
                title={`${capitalize(contractDetail.bindingType.replace('_', ' '))} Info`}
              >
                <Item label="Price Per Book:" value={currency(contractDetail.pricePerBook).format()} />
                <Item label="Pre-Sale Price:" value={currency(contractDetail.presalePrice).format()} />
                <Item label="Final-Sale Price:" value={currency(contractDetail.finalSalePrice).format()} />
                <Item label="Hard Copy Proof:" value={contractDetail.hardCopyProof ? 'Yes' : 'No'} />
                <Item label="Number of Extras:" value={contractDetail.numOfExtras} />
              </Section>
            ))}
          </div>
          <div className="col-span-3">
            <Section title="Checklist" contentClass="flex flex-col gap-2">
              <Item label="Pixami Setup Date:" value={formattedDate(yearbookAdminJob.pixamisetupdate)} />
              <Item
                label="Flyers / Posters Sent Date:"
                value={formattedDateTime(yearbookAdminJob.dateflyersposterssenttoprint)}
              />
              <Item
                label="Flow Class Pictures:"
                value={formattedDate(yearbookAdminJob.flowClassPictures)}
              />
              <Item
                label="Cover Approval:"
                value={formattedDate(yearbookAdminJob.coverApproval)}
              />
              <Item
                label="Submitted YB for Proofing:"
                value={formattedDate(yearbookAdminJob.submittedYearbookForProofing)}
              />
              <Item
                label="Submitted Final YB:"
                value={formattedDate(yearbookAdminJob.submittedFinalYearbook)}
              />
            </Section>
          </div>
        </div>
      )}
    </Page>
  );
}
