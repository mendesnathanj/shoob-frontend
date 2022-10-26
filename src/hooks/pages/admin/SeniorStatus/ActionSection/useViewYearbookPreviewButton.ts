import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { ONE_SECOND } from '@/utils/constants';
import { YearbookPreview } from '@/models/v2';

type IYearbookPreview = YearbookPreview | null | undefined;

export function useYearbookPreview(schoolId: number) {
  return useQuery(['useYearbookPreview', schoolId], () => (
    YearbookPreview
      .where({ schoolId })
      .first()
      .then((res) => res.data)
  ), { refetchInterval: 10 * ONE_SECOND, refetchOnMount: false, refetchOnWindowFocus: false });
}

export function useComponentProps(yearbookPreview: IYearbookPreview, isRequestingPreview: boolean) {
  return useMemo(() => {
    if (isRequestingPreview) {
      return ({
        Button: { disabled: true, variant: 'base' } as const,
        Tooltip: { label: 'Your preview is generating and will be available shortly.', openDelay: 0 },
      });
    }

    if (!yearbookPreview) {
      return ({
        Button: { disabled: true, variant: 'base' } as const,
        Tooltip: {
          label: 'You must generate a preview to view it. It will be available shortly after generating.',
          openDelay: 0,
        },
      });
    }

    return { Button: { variant: 'primary' } as const, Tooltip: { disabled: true, label: '' } };
  }, [yearbookPreview, yearbookPreview?.previewUrl, isRequestingPreview]);
}

export function useToastNotification(
  yearbookPreview: IYearbookPreview,
  previousUrl: string | undefined,
  isRequestingPreview: boolean,
  setIsRequestingPreview: (next: boolean) => void
) {
  useEffect(() => {
    if (!isRequestingPreview) return;
    if (previousUrl === yearbookPreview?.previewUrl) return;

    if (isRequestingPreview && yearbookPreview) {
      toast('Your preview is ready to view', { autoClose: 2000, type: 'success' });
      setIsRequestingPreview(false);
    }
  }, [isRequestingPreview, yearbookPreview?.previewUrl, previousUrl]);
}
