import React, { useEffect, useState } from 'react';
import { LogsList } from './components/LogsList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { LogsFilter } from './components/LogsFilter';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { usePaginationAutoCorrect } from 'hooks/usePaginationAutoCorrect';

interface initalQuery {
  PageIndex: number;
  PageSize: number;
  Text?: string;
  Action?: number;
  StartDate?: Dayjs | null;
  EndDate?: Dayjs | null;
  UserId?: number;
}

export function Logs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<initalQuery>({
    PageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    PageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });
  const { t } = useTranslation();
  const { refetch: getLogs, data: logs } = useQueryApiClient({
    request: {
      url: '/api/logs/filter',
      method: 'GET',
      data: queryParams,
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  useEffect(() => {
    getLogs();
  }, [queryParams]);

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      Text: changedValue.text,
      UserId: changedValue.userId,
      Action: changedValue.action,
      StartDate: changedValue.startDate ? dayjs(changedValue.startDate) : null,
      EndDate: changedValue.endDate ? dayjs(changedValue.endDate) : null,
    }));
  };

  const resetFileds = () => {
    setQueryParams((res) => ({
      ...res,
      Action: undefined,
      UserId: undefined,
      Text: undefined,
      StartDate: undefined,
      EndDate: undefined,
    }));
  };

  usePaginationAutoCorrect(logs?.data, setQueryParams, setSearchParams);

  return (
    <div>
      <div className="header-line">
        <h1 className="global-title">{t('logs')}</h1>
      </div>
      <LogsFilter resetFileds={resetFileds} handleFilterChange={handleFilterChange} />
      <LogsList logs={logs} />
      <Pagination
        total={logs?.data?.totalItems}
        pageSize={logs?.data?.itemsPerPage}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
        current={logs?.data?.PageIndex}
      />
    </div>
  );
}
