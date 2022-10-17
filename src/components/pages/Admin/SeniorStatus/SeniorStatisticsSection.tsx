import LabeledItem from '@/components/common/LabeledItem';
import Section from '@/components/common/Section';
import {
  useAppointmentData,
  useEnrolledSeniors,
  usePhotographedSeniors,
  useYearbookPoseData
} from '@/hooks/seniors/useSeniorData';

interface SeniorStatisticsSectionProps {
  schoolId: number;
}

export default function SeniorStatisticsSection({ schoolId }: SeniorStatisticsSectionProps) {
  const { data: enrolledData, isLoading: isEnrolledLoading } = useEnrolledSeniors(schoolId);
  const { data: apptData, isLoading: isApptLoading } = useAppointmentData(schoolId);
  const { data: photographData, isLoading: isPhotographLoading } = usePhotographedSeniors(schoolId);
  const { data: yearbookPoseData, isLoading: isYearbookLoading } = useYearbookPoseData(schoolId);

  return (
    <Section title="Senior Information" contentClass="grid grid-cols-4">
      <LabeledItem isLoading={isEnrolledLoading} label="Enrolled Seniors" value={enrolledData} />
      <LabeledItem isLoading={isPhotographLoading} label="Photographed Seniors" value={photographData} />
      <LabeledItem isLoading={isApptLoading} label="Has a Future Appointment" value={apptData} />
      <LabeledItem isLoading={isYearbookLoading} label="Has Selected Yearbook Pose" value={yearbookPoseData} />
    </Section>
  );
}
