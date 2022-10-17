import { useLocation, useNavigate } from 'react-router';
import qs from 'query-string';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import Button from '@/components/ui/Button';

export default function SeniorTableFilters() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between min-w-full">
      <Form
        className="grid grid-cols-3 gap-4 ml-auto"
        onSubmit={(values) => {
          navigate({
            pathname: location.pathname,
            search: qs.stringify(values, { skipEmptyString: true })
          });
        }}
      >
        <Input label="Student ID" name="studentId" />
        <Input label="Student Name" name="studentName" />
        <Button className="place-self-end" fullWidth submit variant="primary">Search</Button>
      </Form>
    </div>
  );
}
