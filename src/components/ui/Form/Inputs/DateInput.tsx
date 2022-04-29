import { format } from 'date-fns';
import { forwardRef, useContext, useEffect, useState } from 'react';
import Calendar, { useCalendar } from '../../Calendar/Calendar';
import Tooltip from '../../Tooltip';

const DATE_FORMAT = 'MM-dd-yyyy';

const Component = forwardRef(({
  dateString, setDateString
}, ref) => {
  const { open, setOpen } = useContext(TooltipContext);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) return;

    setOpen(false);
  }, [dateString]);

  return (
    <>
      <input
        ref={ref}
        type="text"
        value={dateString}
        onChange={(e) => setDateString(e.target.value)}
        onFocus={() => {
          setOpen(false);
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      <button type="button" onClick={() => setOpen(!open)}>Toggle Calendar</button>
    </>
  );
});

export default function DateInput() {
  const { firstDayOfMonth, selectedDate, setFirstDayOfMonth, setSelectedDate, today } = useCalendar();
  const [dateString, setDateString] = useState<string>(format(today, DATE_FORMAT));

  const calendarProps = {
    firstDayOfMonth,
    selectedDate,
    setFirstDayOfMonth,
    setSelectedDate: (date: Date) => {
      setSelectedDate(date);
      setDateString(format(date, DATE_FORMAT));
    }
  };

  return (
    <Tooltip label={<Calendar {...calendarProps} />}>
      <Component dateString={dateString} setDateString={setDateString} />
    </Tooltip>
  );
}
