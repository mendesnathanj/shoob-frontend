import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import usePrevious from '@/hooks/usePrevious';
import {
  useToastNotification,
  useYearbookPreview,
} from '@/hooks/pages/admin/SeniorStatus/ActionSection/useViewYearbookPreviewButton';
import routes from '@/routes';

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

  return (
    <Link
      openInNewTab
      variant="plain"
      to={routes.admin.seniorYearbookPreview()}
    >
      <Button startIcon={<FontAwesomeIcon icon={faFilePdf} />} variant="primary">
        View Yearbook Preview
      </Button>
    </Link>
  );
}
