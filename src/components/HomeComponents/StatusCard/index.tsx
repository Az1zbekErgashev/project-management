import React from 'react';
import { useTranslation } from 'react-i18next';
import { PROJECT_STATUS } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';

export function StatusCard() {
  const { t } = useTranslation();
  const { data: countsData } = useQueryApiClient({
    request: {
      url: '/api/request/request-status-count',
      method: 'GET',
    },
  });

  return (
    <React.Fragment>
      {countsData?.data?.map((table: any, index: any) => (
        <div className="status-table" key={index}>
          <div className="table-header">
            <h3 className="table-title">
              {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
            </h3>
            <h3 className="table-title">{table.total}</h3>
          </div>
          <div className="status-rows">
            {PROJECT_STATUS.map((status, statusIndex) => {
              const found = table?.counts?.find((item: any) => item.status === status.text);
              return (
                <div className="status-row" key={statusIndex}>
                  <div className="status-name" style={{ color: status.color }}>
                    {status.text}
                  </div>
                  <div className="status-value" style={{ color: status.color }}>
                    {found?.count ?? 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
