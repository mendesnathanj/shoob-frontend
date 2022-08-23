import { useQuery, useQueries } from 'react-query';
import { OrderPackage, Pose, Student, StudentImage } from '@/models/v2';

const PAGE_SIZE = 20;

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

export function useSeniorsWithYearbookPoses(schoolId: number) {
  const { data: enrolledCount } = useEnrolledSeniors(49);

  const pages: number[] = new Array(Math.round((enrolledCount || 0) / PAGE_SIZE))
    .fill(1)
    .map((pageNum, i) => i + pageNum);

  const orderPackageScope = OrderPackage.where({ hasSeniorImage: true, purchased: true });
  const studentImageScope = StudentImage.where({ isCurrentYear: true, isSenior: true });
  const poseScope = Pose.where({ isDefaultYearbookPose: true, skipAccessCode: true });

  const studentQueries = useQueries(
    pages.map((pageNum) => ({
      queryFn: () => (
        Student
          .merge({
            orderPackages: orderPackageScope,
            poses: poseScope,
            studentImages: studentImageScope,
          })
          .where({ enrolled: true, grade: 12, schoolId })
          .page(pageNum)
          .order('alphabetical')
          .includes([{ orderPackages: ['seniorImage'], studentImages: ['poses'] }])
          .all()
          .then((res) => res.data)
      ),
      queryKey: ['useSeniorsWithYearbookPoses', pageNum, schoolId],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }))
  );

  return ({
    data: studentQueries
      .filter((queryData) => !queryData.isLoading)
      .map((queryData) => queryData.data)
      .flat(),
    isLoading: studentQueries.some((queryData) => queryData.isLoading),
  });
}
