import Link from '@/components/ui/Link';
import { BASE_URL } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import EmployeeNav from './EmployeeNav';

const LINKS = [
  { text: 'Schools', url: '/admin/schools' },
  { text: 'Jobs', url: '/djobs?type=confirms' },
  { text: 'Projects', url: '/dprojects' },
  { text: 'Students', url: '/export/students' },
  { text: 'Orders', url: '/orders' },
  { text: 'Dashboard', url: '/admin/dashboards' },
] as const;

export default function Nav() {
  const { user } = useAuth();

  if (!user) return null;

  console.log(user.isAdmin() || user.employee)

  if (user.isAdmin() || user.employee) {
    return (
      <nav className="min-w-full">
        <ul className="flex gap-12 p-4 items-center justify-center min-w-full text-xl">
          {LINKS.map((link) => (
            <Link external to={`${BASE_URL}${link.url}`}>
              {link.text}
            </Link>
          ))}
        </ul>
      </nav>
    );
  }

  return <EmployeeNav />;
}
