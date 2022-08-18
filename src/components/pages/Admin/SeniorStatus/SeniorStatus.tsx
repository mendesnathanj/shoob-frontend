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

export default function SeniorStatus() {
  const { user } = useAuth();
  const { data: enrolledData, isLoading: isEnrolledLoading } = useEnrolledSeniors((user as User).schoolId);
  const { data: apptData, isLoading: isApptLoading } = useAppointmentData((user as User).schoolId);
  const { data: photographData, isLoading: isPhotographLoading } = usePhotographedSeniors((user as User).schoolId);
  const { data: yearbookPoseData, isLoading: isYearbookLoading } = useYearbookPoseData((user as User).schoolId);

  return (
    <Page className="flex flex-col gap-12">
      <Link external to={routes.external.home()}>
        Shoob
      </Link>
      <Section title="Senior Information" contentClass="grid grid-cols-4">
        <LabeledItem isLoading={isEnrolledLoading} label="Enrolled Seniors" value={enrolledData} />
        <LabeledItem isLoading={isPhotographLoading} label="Photographed Seniors" value={photographData} />
        <LabeledItem isLoading={isApptLoading} label="Has a Future Appointment" value={apptData} />
        <LabeledItem isLoading={isYearbookLoading} label="Has Selected Yearbook Pose" value={yearbookPoseData} />
      </Section>
      <Section title="Photos" />
    </Page>
  );
}
