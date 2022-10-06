import { QueryClient } from 'react-query';

export const USER_DATE_FORMAT = 'MM/dd/yyyy';
export const SERVER_DATE_FORMAT = 'yyyy-MM-dd';
export const SERVER_DATE_TIME_FORMAT = "yyyy-MM-dd H:m:s 'UTC'";
export const USER_DATE_TIME_FORMAT = `${USER_DATE_FORMAT} h:mm:ss a`;
export const CLIENT_TIME_ZONE = 'America/Los_Angeles';

export const INPUT_FORMAT = 'MMddyyyy';

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;

export const queryClient = new QueryClient();
