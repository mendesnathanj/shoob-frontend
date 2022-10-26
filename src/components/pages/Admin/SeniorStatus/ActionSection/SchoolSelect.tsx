import { useLocation, useNavigate } from 'react-router';
import qs from 'query-string';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';

interface SchoolSelectProps {
  schoolId: number;
}

export default function SchoolSelect({ schoolId }: SchoolSelectProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Form
      autoSave={{ delay: 250 }}
      className="min-w-[250px]"
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
  );
}
