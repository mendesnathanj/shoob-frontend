import { useParams } from 'react-router';
import YearbookAdminJobForm from '../../../admin/forms/YearbookAdminJobForm';

export default function YearbookAdminJobEdit() {
  const { id } = useParams();

  return <YearbookAdminJobForm id={id} />;
}
