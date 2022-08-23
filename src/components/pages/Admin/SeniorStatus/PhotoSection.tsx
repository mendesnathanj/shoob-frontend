import Section from '@/components/common/Section';
import Spinner from '@/components/ui/Spinner';
import { useSeniorsWithYearbookPoses } from '@/hooks/seniors/useSeniorData';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';

export default function PhotoSection() {
  const { user } = useAuth();
  const { data: students, isLoading } = useSeniorsWithYearbookPoses((user as User).schoolId);

  return (
    <Section title="Photos">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {students.map((student) => {
            if (!student) return null;
            if (student.yearbookImage() === undefined) return null;
            if (!student.yearbookImage()?.imageUrl) return null;

            return <img src={student.yearbookImage()?.imageUrl || ''} alt="boop" />;
          })}
        </>
      )}
    </Section>
  );
}
