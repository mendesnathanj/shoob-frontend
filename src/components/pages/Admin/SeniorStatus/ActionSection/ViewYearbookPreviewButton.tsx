import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import usePrevious from '@/hooks/usePrevious';
import {
  useComponentProps,
  useToastNotification,
  useYearbookPreview,
} from '@/hooks/pages/admin/SeniorStatus/ActionSection/useViewYearbookPreviewButton';

interface ViewYearbookPreviewButtonProps {
  isRequestingPreview: boolean;
  schoolId: number;
  setIsRequestingPreview: (next: boolean) => void;
}

export default function ViewYearbookPreviewButton({
  isRequestingPreview,
  schoolId,
  setIsRequestingPreview
}: ViewYearbookPreviewButtonProps) {
  const { data: yearbookPreview } = useYearbookPreview(schoolId);
  const previousUrl = usePrevious(yearbookPreview?.previewUrl);
  useToastNotification(yearbookPreview, previousUrl, isRequestingPreview, setIsRequestingPreview);
  const props = useComponentProps(yearbookPreview, isRequestingPreview);

  return (
    <Tooltip {...props.Tooltip} offset={12}>
      <Link
        external
        openInNewTab
        variant="plain"
        to={yearbookPreview?.previewUrl || ''}
      >
        <Button {...props.Button}>View Yearbook Preview</Button>
      </Link>
    </Tooltip>
  );
}
