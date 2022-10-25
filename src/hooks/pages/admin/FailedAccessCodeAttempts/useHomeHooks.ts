import { useQuery } from 'react-query';
import { FailedAccessCodeAttempt } from '@/models/v2';

export function useTotalUnprocessedFailedAttempts() {
  return useQuery<number>('useTotalUnprocessedFailedAttempts', () => (
    FailedAccessCodeAttempt
      .per(0)
      .where({ status: 'not_processed' })
      .stats({ total: 'count' })
      .first()
      .then((res) => res.meta.stats.total.count)
  ));
}
