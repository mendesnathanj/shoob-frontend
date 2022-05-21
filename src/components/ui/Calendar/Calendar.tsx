import { forwardRef, useLayoutEffect, useState } from 'react';
import { isSameMonth, startOfMonth } from 'date-fns';
import cn from 'classnames';
import Header from './helpers/Header';
import CalendarTable from './helpers/CalendarTable';

const sizeClasses = {
  medium: '',
  small: 'min-w-[290px] max-w-[310px]',
};

type CalendarProps = {
  onChange: (date: Date) => void;
  value: Date;
  size?: keyof typeof sizeClasses;
};

function useCalendar(initialValue: Date) {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(initialValue));
  const [selectedDate, setSelectedDate] = useState<Date>(initialValue);

  return { firstDayOfMonth, selectedDate, setFirstDayOfMonth, setSelectedDate };
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  onChange,
  value,
  size = 'sm',
}, ref) => {
  const { firstDayOfMonth, selectedDate, setFirstDayOfMonth, setSelectedDate } = useCalendar(value);

  useLayoutEffect(() => {
    if (isSameMonth(firstDayOfMonth, selectedDate)) return;

    setFirstDayOfMonth(startOfMonth(selectedDate));
  }, [selectedDate]);

  const changeHandler = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div ref={ref} className={cn(sizeClasses[size as keyof typeof sizeClasses], 'p-2 rounded-md')}>
      <Header firstDayOfMonth={firstDayOfMonth} setFirstDayOfMonth={setFirstDayOfMonth} />
      <CalendarTable firstDayOfMonth={firstDayOfMonth} selectedDate={selectedDate} onChange={changeHandler} />
    </div>
  );
});

export default Calendar;
