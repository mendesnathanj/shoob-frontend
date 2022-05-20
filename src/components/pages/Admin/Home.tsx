import { Link } from 'react-router-dom';
import routes from '../../routes';
import DropdownButton from '../../ui/DropdownButton';

export default function Home() {
  return (
    <Link to={routes.admin.yearbookJobs()} />
  );
}
