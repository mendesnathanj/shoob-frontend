import { format, parse } from 'date-fns';
import { SERVER_DATE_FORMAT, USER_DATE_FORMAT, SERVER_DATE_TIME_FORMAT } from './constants';

type FORMAT = 'client' | 'server';

export function formattedDate(date: null | string | Date = '', targetFormat: FORMAT = 'client'): string {
  if (!date) return '';

  const fromFormat = targetFormat === 'client' ? SERVER_DATE_FORMAT : USER_DATE_FORMAT;
  const toFormat = targetFormat === 'server' ? SERVER_DATE_FORMAT : USER_DATE_FORMAT;

  if (typeof date === 'string') {
    return format(parse(date, fromFormat, new Date()), toFormat);
  }

  return format(date, toFormat);
}

export function formattedDateTime(
  dateTime: undefined | null | string | Date = '',
  targetFormat: FORMAT = 'client'
): string {
  if (!dateTime) return '';

  const fromFormat = targetFormat === 'client' ? SERVER_DATE_TIME_FORMAT : USER_DATE_FORMAT;
  const toFormat = targetFormat === 'server' ? SERVER_DATE_FORMAT : USER_DATE_FORMAT;

  if (typeof dateTime === 'string') {
    return format(parse(dateTime, fromFormat, new Date()), toFormat);
  }

  return format(dateTime, toFormat);
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
