import { useLocation, useNavigate } from 'react-router';
import qs from 'query-string';
import Section from '@/components/common/Section';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import routes from '@/routes';
import DropdownButton from '@/components/ui/DropdownButton';
import { useAuth } from '@/hooks/useAuth';

interface ActionSectionProps {
  schoolId: number;
}

export default function ActionSection({ schoolId }: ActionSectionProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Section title="Actions" contentClass="grid grid-cols-12">
      {user && user.isAdmin() && (
        <Form
          autoSave={{ delay: 250 }}
          className="col-span-3"
          defaultValues={{ schoolId: schoolId.toString() }}
          onSubmit={(values) => {
            navigate({
              pathname: location.pathname,
              search: qs.stringify(values, { skipEmptyString: true })
            });
          }}
        >
          <Input.School />
        </Form>
      )}
      <div className="col-start-12 flex justify-center items-end">
        <div>
          <DropdownButton label="Download CSV" variant="success">
            <DropdownButton.Link
              download
              external
              to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=enrolled`}
              variant="plain"
            >
              Enrolled Seniors
            </DropdownButton.Link>
            <DropdownButton.Link
              download
              external
              to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=photographed`}
              variant="plain"
            >
              Photographed Seniors
            </DropdownButton.Link>
            <DropdownButton.Link
              download
              external
              to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=appointments`}
              variant="plain"
            >
              With an Appointment
            </DropdownButton.Link>
            <DropdownButton.Link
              download
              external
              to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=with_pose`}
              variant="plain"
            >
              Selected a Yearbook Pose
            </DropdownButton.Link>
          </DropdownButton>
        </div>
      </div>
    </Section>
  );
}
