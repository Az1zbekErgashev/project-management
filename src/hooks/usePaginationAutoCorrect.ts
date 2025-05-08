import { useEffect } from 'react';

interface PaginationData {
  totalPages: number;
  pageIndex: number;
}

export function usePaginationAutoCorrect(
  data: PaginationData | undefined,
  setQueryParams: (callback: (prev: any) => any) => void,
  setSearchParams: (callback: (prev: URLSearchParams) => URLSearchParams) => void
) {
  useEffect(() => {
    if (data) {
      const { totalPages, pageIndex } = data;

      if (totalPages > 0 && pageIndex > totalPages) {
        setQueryParams((prev: any) => ({ ...prev, pageIndex: totalPages }));
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('pageIndex', totalPages.toString());
          return newParams;
        });
      } else if (totalPages === 0 && pageIndex > 1) {
        setQueryParams((prev: any) => ({ ...prev, pageIndex: 1 }));
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('pageIndex', '1');
          return newParams;
        });
      }
    }
  }, [data, setQueryParams, setSearchParams]);
}
