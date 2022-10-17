import qs from 'query-string';
import { useLocation } from 'react-router-dom';

const defaultOptions = { parseBooleans: true, parseNumbers: true };

export default function useQueryString(opts = defaultOptions) {
  return qs.parse(useLocation().search, opts);
}
