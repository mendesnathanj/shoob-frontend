import { useLocation, useNavigate } from 'react-router';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Page from '@/components/ui/Page';
import Section from '@/components/common/Section';
import LabeledItem from '@/components/common/LabeledItem';
import {
  useEnrolledSeniors,
  useAppointmentData,
  usePhotographedSeniors,
  useYearbookPoseData
} from '@/hooks/seniors/useSeniorData';
import Link from '@/components/ui/Link';
import routes from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';
import SeniorTable from '../../../admin/tables/SeniorTable';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import useQueryString from '@/hooks/useQueryString';
import Button from '@/components/ui/Button';

export default function SeniorStatus() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryString = useQueryString();

  const schoolId = (queryString.schoolId || (user as User).schoolId) as number;

  const { data: enrolledData, isLoading: isEnrolledLoading } = useEnrolledSeniors(schoolId);
  const { data: apptData, isLoading: isApptLoading } = useAppointmentData(schoolId);
  const { data: photographData, isLoading: isPhotographLoading } = usePhotographedSeniors(schoolId);
  const { data: yearbookPoseData, isLoading: isYearbookLoading } = useYearbookPoseData(schoolId);

  return (
    <Page className="flex flex-col gap-12" maxWidth="2xl">
      <Link external to={routes.external.home()}>
        To Shoob
      </Link>
      <Section title="Actions" contentClass="grid grid-cols-12">
        <Form
          autoSave={{ delay: 250 }}
          className="col-span-3"
          defaultValues={{ schoolId: schoolId.toString() }}
          onSubmit={(values) => {
            navigate({
              pathname: location.pathname,
              search: qs.stringify(values, { skipEmptyString: true })
            });
          }}
        >
          <Input.School />
        </Form>
        <div className="col-start-12 flex justify-center items-end">
          <Link
            download
            external
            to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}`}
            variant="plain"
          >
            <Button
              startIcon={<FontAwesomeIcon icon={faDownload} />}
              variant="success"
            >
              Download CSV
            </Button>
          </Link>
        </div>
      </Section>
      <Section title="Senior Information" contentClass="grid grid-cols-4">
        <LabeledItem isLoading={isEnrolledLoading} label="Enrolled Seniors" value={enrolledData} />
        <LabeledItem isLoading={isPhotographLoading} label="Photographed Seniors" value={photographData} />
        <LabeledItem isLoading={isApptLoading} label="Has a Future Appointment" value={apptData} />
        <LabeledItem isLoading={isYearbookLoading} label="Has Selected Yearbook Pose" value={yearbookPoseData} />
      </Section>
      <SeniorTable schoolId={schoolId} />
    </Page>
  );
}
