import { useQuery } from 'react-query';
import { Pose, Student, StudentImage } from '@/models/v2';

interface useStudentWithYearbookPosesProps {
  id: string;
}

export default function useStudentWithYearbookPoses({ id }: useStudentWithYearbookPosesProps) {
  const studentImageScope = StudentImage.where({ folder: { prefix: 'senior' }, isCurrentYear: true });
  const poseScope = Pose.where({ type: 'SeniorImage' }).selectExtra(['imageUrl']).order('id');

  return useQuery([id, 'useStudentWithYearbookPoses'], () => (
    Student
      .includes({ studentImages: 'poses' })
      .merge({ poses: poseScope, studentImages: studentImageScope })
      .selectExtra(['seniorYearbookPoseId'])
      .find(id)
      .then((res) => res.data)
  ), { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });
}
