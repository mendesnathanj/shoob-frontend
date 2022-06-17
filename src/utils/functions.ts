import { format, parse } from 'date-fns';
import { SERVER_DATE_FORMAT, USER_DATE_FORMAT } from './constants';

export const clientFormattedDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return format(parse(date, SERVER_DATE_FORMAT, new Date()), USER_DATE_FORMAT);
  }

  return format(date, USER_DATE_FORMAT);
};
