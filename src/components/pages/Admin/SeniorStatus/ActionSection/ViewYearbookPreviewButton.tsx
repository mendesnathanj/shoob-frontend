import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import routes from '@/routes';

export default function ViewYearbookPreviewButton() {
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
