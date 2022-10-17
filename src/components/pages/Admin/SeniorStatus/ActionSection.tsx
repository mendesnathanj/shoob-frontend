import { useLocation, useNavigate } from 'react-router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'query-string';
import Section from '@/components/common/Section';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import Link from '@/components/ui/Link';
import routes from '@/routes';

interface ActionSectionProps {
  schoolId: number;
}

export default function ActionSection({ schoolId }: ActionSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Section title="Actions" contentClass="grid grid-cols-12">
      <Form
        autoSave={{ delay: 250 }}
        className="col-span-3"
        defaultValues={{ schoolId }}
        onSubmit={(values) => {
          navigate({
            pathname: location.pathname,
            search: qs.stringify(values, { skipEmptyString: true })
          });
        }}
      >
        <Input.School />
      </Form>
      <div className="col-start-12 flex justify-center items-end">
        <Link
          download
          external
          to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}`}
          variant="plain"
        >
          <Button
            startIcon={<FontAwesomeIcon icon={faDownload} />}
            variant="success"
          >
            Download CSV
          </Button>
        </Link>
      </div>
    </Section>
  );
}
