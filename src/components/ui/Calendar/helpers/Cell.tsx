import cn from 'classnames';
import { format } from 'date-fns';

const baseClasses = `
  pt-1 h-9 w-9 relative
  after:content-[''] after:absolute after:inset-0 after:hover:bg-blue-200/20
  after:rounded-full after:hover:block
  focus:outline-none focus:after:block focus:after:border-blue-400 after:focus:border-2
`;

const activeClasses = `
  after:bg-blue-400/20 after:block
`;

const selectedClasses = `
  after:border-blue-400 after:border-2
`;

type CellProps = {
  date: Date,
  isInMonth: boolean;
  isDayToday: boolean;
  isSelected: boolean;
  onClick: (date: Date) => void;
};

export default function Cell({ date, isInMonth, isDayToday, isSelected, onClick }: CellProps) {
  return (
    <td className={`text-center ${isInMonth ? '' : 'opacity-50'}`}>
      <button
        tabIndex={isDayToday ? 0 : -1}
        className={cn({ [activeClasses]: isDayToday, [baseClasses]: true, [selectedClasses]: isSelected })}
        onClick={() => onClick(date)}
        type="button"
      >
        {format(date, 'd')}
      </button>
    </td>
  );
}
