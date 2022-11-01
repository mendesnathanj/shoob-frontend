import { useEffect, useState } from 'react';
import useStudentWithYearbookPoses from '@/components/admin/forms/StudentYearbookPoseForm/useStudentWithYearbookPoses';
import { useModal } from '@/hooks/useModal';
import { Pose } from '@/models/v2';
import { queryClient } from '@/utils/constants';

interface StudentYearbookPoseFormProps {
  id: string;
}

export default function StudentYearbookPoseForm({ id }: StudentYearbookPoseFormProps) {
  const { closeModal, setHeader, setOnSubmit } = useModal();
  const { data: student, isLoading } = useStudentWithYearbookPoses({ id });
  const [currentPoseId, setCurrentPoseId] = useState<string>(student?.seniorYearbookPoseId || '');
  const [poses, setPoses] = useState<Pose[]>([]);

  const onSubmit = async () => {
    const currentPose = poses.find((pose) => pose.id === currentPoseId);

    if (!currentPose) return;

    currentPose.isYearbookPose = true;

    await currentPose.save();

    queryClient.invalidateQueries({ queryKey: ['useSeniorsWithYearbookPoses'] });
    queryClient.invalidateQueries({ queryKey: [id, 'useStudentWithYearbookPoses'] });

    closeModal();
  };

  useEffect(() => {
    if (!student) return;

    setHeader(`Change Yearbook Pose for ${student.fullName()}`);
  }, [student?.id]);

  useEffect(() => setOnSubmit(onSubmit), [poses.length, currentPoseId]);

  useEffect(() => setCurrentPoseId(student?.seniorYearbookPoseId || ''), [student?.seniorYearbookPoseId]);

  useEffect(() => {
    if (!student) return;
    if (student.studentImages.length === 0) return;

    setPoses(student.studentImages.map((studentImage) => studentImage.poses).flat());
  }, [student, id]);

  if (isLoading) return null;
  if (!student) return null;
  if (student.studentImages.length === 0) return null;

  return (
    <div className="grid grid-cols-8 gap-8">
      {poses.map((pose) => {
        const checked = currentPoseId === pose.id;

        return (
          <label className="flex flex-col items-center gap-4" key={pose.id}>
            <img
              className={`cursor-pointer transition-all rounded mx-auto ${checked ? 'bg-shoob-300' : 'bg-slate-100'}`}
              src={pose.imageUrl}
              alt={`Pose ${pose.id}`}
            />
            <input
              type="radio"
              name="poseId"
              checked={checked}
              onChange={() => setCurrentPoseId(pose.id as string)}
            />
          </label>
        );
      })}
    </div>
  );
}
