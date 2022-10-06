import { format, parse } from 'date-fns';
import { startCase, toLower } from 'lodash';
import {
  SERVER_DATE_FORMAT,
  USER_DATE_FORMAT,
  SERVER_DATE_TIME_FORMAT,
  USER_DATE_TIME_FORMAT,
  ONE_HOUR,
} from './constants';

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
  targetFormat: FORMAT = 'client',
  includeTime: boolean = false,
): string {
  if (!dateTime) return '';

  const fromFormat = targetFormat === 'client' ? SERVER_DATE_TIME_FORMAT : USER_DATE_FORMAT;
  const toFormat = toFormatFunction(targetFormat, includeTime);

  if (typeof dateTime === 'string') {
    const parsedDate = parse(dateTime, fromFormat, new Date());
    const zonedDate = new Date(parsedDate.valueOf() - (7 * ONE_HOUR));

    return format(zonedDate, toFormat);
  }

  return format(dateTime, toFormat);
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function titleize(string: string): string {
  return startCase(toLower(string));
}

// NON-EXPORTED HELPER FUNCTIONS
function toFormatFunction(targetFormat: FORMAT = 'client', includeTime: boolean = false) {
  if (targetFormat === 'client') {
    if (includeTime) return USER_DATE_TIME_FORMAT;

    return USER_DATE_FORMAT;
  }

  return SERVER_DATE_FORMAT;
}
