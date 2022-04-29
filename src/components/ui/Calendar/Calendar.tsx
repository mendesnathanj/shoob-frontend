import { useLayoutEffect, useState } from 'react';
import { differenceInYears, isEqual, isSameDay, isSameMonth, isValid, startOfMonth } from 'date-fns';
import cn from 'classnames';
import Header from './helpers/Header';
import CalendarTable from './helpers/CalendarTable';

const SIZES = ['small', 'medium'] as const;

const sizeClasses = {
  medium: '',
  small: 'min-w-[290px] max-w-[310px]',
};

type CalendarProps = {
  onChange: (date: Date) => void;
  value: Date;
  size?: typeof SIZES[number];
};

const isSelectedValid = (selected: Date, today: Date) => {
  if (!isValid(selected)) return false;

  if (differenceInYears(selected, today) > 10) return false;
};

function useCalendar(initialValue: Date) {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(initialValue));
  const [selectedDate, setSelectedDate] = useState<Date>(initialValue);

  return { firstDayOfMonth, selectedDate, setFirstDayOfMonth, setSelectedDate };
}

export default function Calendar({
  onChange = () => {},
  value = new Date(),
  size = 'small',
}: CalendarProps) {
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
    <div className={cn(sizeClasses[size], 'p-2 rounded-md')}>
      <Header firstDayOfMonth={firstDayOfMonth} setFirstDayOfMonth={setFirstDayOfMonth} />
      <CalendarTable firstDayOfMonth={firstDayOfMonth} selectedDate={selectedDate} onChange={changeHandler} />
    </div>
  );
}
