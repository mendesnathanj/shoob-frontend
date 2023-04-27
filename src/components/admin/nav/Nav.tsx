import Link from '@/components/ui/Link';
import { BASE_URL } from '@/utils/constants';

const LINKS = [
  { text: 'Schools', url: '/admin/schools' },
  { text: 'Jobs', url: '/djobs?type=confirms' },
  { text: 'Projects', url: '/dprojects' },
  { text: 'Students', url: '/export/students' },
  { text: 'Orders', url: '/orders' },
  { text: 'Dashboard', url: '/admin/dashboards' },
] as const;

export default function Nav() {
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
