import { useQuery } from 'react-query';
import { OrderPackage, Pose, Student, StudentImage } from '@/models/v2';

export function useEnrolledSeniors(schoolId: number) {
  return (
    useQuery<number>(['useEnrolledSeniors', schoolId], () => (
      Student
        .where({ enrolled: true, grade: 12, schoolId })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function usePhotographedSeniors(schoolId: number) {
  return (
    useQuery<number>(['usePhotographedSeniors', schoolId], () => (
      Student
        .where({ grade: 12, photographedSeniors: true, schoolId })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function useYearbookPoseData(schoolId: number) {
  return (
    useQuery<number>(['useYearbookPoseData', schoolId], () => (
      Student
        .where({ grade: 12, schoolId, seniorsWithYearbookPose: true })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function useAppointmentData(schoolId: number) {
  return (
    useQuery<number>(['useAppointmentData', schoolId], () => (
      Student
        .where({ grade: 12, schoolId, withFutureAppointments: true })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function useSeniorPageCount(schoolId: number, pageSize: number) {
  const { data } = useEnrolledSeniors(schoolId);

  return Math.round((data || 0) / pageSize) || -1;
}

export function useSeniorsWithYearbookPoses(schoolId: number, page: number, pageSize: number) {
  const results = useQuery(['useSeniorsWithYearbookPoses', page, schoolId], () => (
    Student
      .selectExtra(['hasDefaultYearbookPose', 'hasSelectedYearbookPose'])
      .where({ enrolled: true, grade: 12, schoolId })
      .page(page)
      .per(pageSize)
      .order('alphabetical')
      .all()
      .then((res) => res.data)
  ), {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return results;
}
