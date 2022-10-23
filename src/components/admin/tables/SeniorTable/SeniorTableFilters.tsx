import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import qs from 'query-string';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Form/Inputs';
import Button from '@/components/ui/Button';
import useRouteQuery from '@/hooks/useRouteQuery';
import TablePagination, { TablePaginationProps } from '@/components/ui/Table/TablePagination';

interface SeniorTableFiltersProps extends TablePaginationProps {}

export default function SeniorTableFilters(props: SeniorTableFiltersProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useRouteQuery();

  return (
    <div className="flex justify-between min-w-full pb-4">
      <TablePagination {...props} />
      <Form
        className="grid grid-cols-5 gap-4 ml-auto"
        defaultValues={{
          firstName: query.get('firstName'),
          lastName: query.get('lastName'),
          scope: query.get('scope') || 'enrolled',
          studentId: query.get('studentId'),
        }}
        onSubmit={(values) => {
          navigate({
            pathname: location.pathname,
            search: qs.stringify({
              schoolId: query.get('schoolId'), ...values,
            }, {
              skipEmptyString: true, skipNull: true,
            })
          });
        }}
      >
        <Input.Select
          label="Filter by:"
          name="scope"
          options={[
            { label: 'Enrolled', value: 'enrolled' },
            { label: 'Photographed', value: 'photographed' },
            { label: 'With an Appointment', value: 'appointments' },
            { label: 'With Pose Selected', value: 'with_pose' },
          ]}
        />
        <Input label="Student ID" name="studentId" />
        <Input label="First Name" name="firstName" />
        <Input label="Last Name" name="lastName" />
        <Button
          className="place-self-end"
          fullWidth
          startIcon={<FontAwesomeIcon icon={faSearch} />}
          submit
          variant="primary"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
