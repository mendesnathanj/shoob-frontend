import { addDays, eachDayOfInterval, getDay, getWeeksInMonth, isEqual, isSameMonth, isToday, subDays, subYears } from 'date-fns';
import { useMemo, useState } from 'react';
import Cell from './Cell';

export function useCalendarData(firstDayOfMonth: Date) {
  const res = useMemo(() => {
    const numRows = getWeeksInMonth(firstDayOfMonth);

    const totalCells = numRows * 7;
    const offset = getDay(firstDayOfMonth);
    const startOfCalendar = subDays(firstDayOfMonth, offset);

    const data = eachDayOfInterval({ end: addDays(startOfCalendar, totalCells - 1), start: startOfCalendar });

    return { data, numRows };
  }, [firstDayOfMonth]);

  return { ...res };
}

export function useFormattedData(
  data: Date[],
  firstDayOfMonth: Date,
  selectedDate: Date,
  numRows: number,
  onClick: (date: Date) => void
) {
  return new Array(numRows).fill(0).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <tr key={i}>
      {
        data.slice(i * 7, (i * 7) + 7).map((date) => {
          const isInMonth = isSameMonth(date, firstDayOfMonth);
          const isDayToday = isToday(date);
          const isSelected = isEqual(selectedDate, date);

          return <Cell key={date.toString()} {...{ date, isDayToday, isInMonth, isSelected, onClick }} />;
        })
      }
    </tr>
  ));
}
