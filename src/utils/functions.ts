import { format, parse } from 'date-fns';
import { SERVER_DATE_FORMAT, USER_DATE_FORMAT } from './constants';

export function formattedDate(
  date: null | string | Date = '',
  targetFormat: 'client' | 'server' = 'client'
): string {
  if (!date) return '';

  const fromFormat = targetFormat === 'client' ? SERVER_DATE_FORMAT : USER_DATE_FORMAT;
  const toFormat = targetFormat === 'server' ? SERVER_DATE_FORMAT : USER_DATE_FORMAT;

  if (typeof date === 'string') {
    return format(parse(date, fromFormat, new Date()), toFormat);
  }

  return format(date, toFormat);
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
