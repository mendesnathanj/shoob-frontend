import { forwardRef, useEffect, useLayoutEffect, useState } from 'react';
import { differenceInYears, isSameMonth, isValid, startOfMonth } from 'date-fns';
import cn from 'classnames';
import Header from './helpers/Header';
import CalendarTable from './helpers/CalendarTable';

const today = new Date();

const sizeClasses = {
  medium: '',
  small: 'min-w-[290px] max-w-[310px]',
};

type CalendarProps = {
  onChange: (date: Date) => void;
  value: Date;
  size?: keyof typeof sizeClasses;
};

const isSelectedValid = (selected: Date) => {
  if (!isValid(selected)) return false;

  if (Math.abs(differenceInYears(selected, today)) > 10) return false;

  return true;
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
  const {
    firstDayOfMonth,
    selectedDate,
    setFirstDayOfMonth,
    setSelectedDate,
  } = useCalendar(isSelectedValid(value) ? value : new Date());

  useLayoutEffect(() => {
    if (isSameMonth(firstDayOfMonth, selectedDate)) return;

    setFirstDayOfMonth(startOfMonth(selectedDate));
  }, [selectedDate]);

  const changeHandler = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div ref={ref} className={cn(sizeClasses[size as keyof typeof sizeClasses], 'p-2 rounded-md bg-white')}>
      <Header firstDayOfMonth={firstDayOfMonth} setFirstDayOfMonth={setFirstDayOfMonth} />
      <CalendarTable firstDayOfMonth={firstDayOfMonth} selectedDate={selectedDate} onChange={changeHandler} />
    </div>
  );
});

export default Calendar;
