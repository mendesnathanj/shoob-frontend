import { addDays, format, startOfWeek } from 'date-fns';
import { useCalendarData, useFormattedData } from './hooks';

const firstDOW = startOfWeek(new Date());
const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => format(addDays(firstDOW, i), 'EEEEEE').toUpperCase());

type CalendarTableProps = {
  firstDayOfMonth: Date;
  onChange: (date: Date) => void;
  selectedDate: Date;
};

export default function CalendarTable({ firstDayOfMonth, onChange, selectedDate }: CalendarTableProps) {
  const { data, numRows } = useCalendarData(firstDayOfMonth);
  const rows = useFormattedData(data, firstDayOfMonth, selectedDate, numRows, onChange);

  return (
    <table className="min-w-full table-fixed text-gray-600">
      <thead>
        <tr>
          {shortWeekDaysArray.map((day) => (
            <td key={day} className="text-center font-semibold tracking-wide text-sm">
              <div className="mb-2">{day}</div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
