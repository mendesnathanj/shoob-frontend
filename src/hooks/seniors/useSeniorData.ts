import { useQuery } from 'react-query';
import { Student } from '@/models/v2';

export function useEnrolledSeniors() {
  return (
    useQuery<number>('useEnrolledSeniors', () => (
      Student
        .where({ enrolled: true, grade: 12, schoolId: 49 })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function usePhotographedSeniors() {
  return (
    useQuery<number>('usePhotographedSeniors', () => (
      Student
        .where({ grade: 12, photographedSeniors: true, schoolId: 49 })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function useYearbookPoseData() {
  return (
    useQuery<number>('useYearbookPoseData', () => (
      Student
        .where({ grade: 12, schoolId: 49, seniorsWithYearbookPose: true })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}

export function useAppointmentData() {
  return (
    useQuery<number>('useAppointmentData', () => (
      Student
        .where({ grade: 12, schoolId: 49, withFutureAppointments: true })
        .per(0)
        .stats({ total: 'count' })
        .all()
        .then((res) => res.meta.stats.total.count)
    ))
  );
}
