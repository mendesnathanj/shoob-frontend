import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { Student } from '@/models/v2';

const REFETCH_SETTINGS: Omit<UseQueryOptions<number, unknown, number, QueryKey>, 'queryKey' | 'queryFn'> = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};

export function useEnrolledSeniors(schoolId: number) {
  return (
    useQuery<number>(['useEnrolledSeniors', schoolId], () => (
      Student
        .where({ enrolled: true, grade: 12, schoolId })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ), { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false })
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
    ), { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false })
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
    ), { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false })
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
    ), { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false })
  );
}

export function useSeniorPageCount(schoolId: number, pageSize: number) {
  const { data } = useEnrolledSeniors(schoolId);

  return Math.round((data || 0) / pageSize) || -1;
}

export function useSeniorsWithYearbookPoses(
  schoolId: number,
  page: number,
  pageSize: number,
  where: object = { enrolled: true },
) {
  return useQuery(['useSeniorsWithYearbookPoses', page, schoolId, where], () => (
    Student
      .selectExtra(['hasDefaultYearbookPose', 'hasSelectedYearbookPose', 'seniorYearbookPoseUrl'])
      .where({ grade: 12, schoolId })
      .where(where)
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
}
