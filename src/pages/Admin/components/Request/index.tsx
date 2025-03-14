import React, { useEffect, useState } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
}

export function Request() {
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10 });
  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
  } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      data: queryparams,
      disableOnMount: true,
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 95);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  useEffect(() => {
    postRequest(queryparams);
  }, [queryparams]);
  return (
    <div>
      <RequestList requests={requests?.data?.items || []} isRequestsLoading={isRequestsLoading} />
      <Pagination
        total={requests?.data?.totalItems}
        pageSize={requests?.data?.itemsPerPage}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
        current={requests?.data?.PageIndex}
      />
    </div>
  );
}
