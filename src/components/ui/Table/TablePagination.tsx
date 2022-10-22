import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';

export interface TablePaginationProps {
  isLoading?: boolean;
  pageIndex: number;
  setPage: (page: number) => void;
}

export default function TablePagination({ isLoading = false, pageIndex, setPage }: TablePaginationProps) {
  return (
    <div className="flex gap-4 items-end py-2">
      <button
        className="h-6 w-6 inline-flex justify-center items-center hover:bg-gray-200 rounded-full transition-all"
        disabled={pageIndex <= 0}
        onClick={() => setPage(Math.max(pageIndex - 1, 0))}
        type="button"
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <div className={isLoading ? '' : '-mb-[1.5px]'}>
        {isLoading ? (
          <Spinner className="opacity-30 w-6 h-6" color="gray" size="sm" />
        ) : (
          <div className="flex items-center justify-center w-6 h-6">{pageIndex + 1}</div>
        )}
      </div>
      <button
        className="h-6 w-6 inline-flex justify-center items-center hover:bg-gray-200 rounded-full transition-all"
        onClick={() => setPage(pageIndex + 1)}
        type="button"
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
}
