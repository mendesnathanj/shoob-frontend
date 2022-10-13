import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

export default function StatusCell({ className = '', status }: { className?: string, status: boolean }) {
  const icon = status ? faCircleCheck : faCircleXmark;
  const colorClass = status ? 'text-green-500' : 'text-red-500';

  return <FontAwesomeIcon className={cn(colorClass, className)} icon={icon} />;
}
