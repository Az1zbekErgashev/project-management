import React from 'react';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';

export function ReasonCard() {
  const { t } = useTranslation();
  const { data: countsData } = useQueryApiClient({
    request: {
      url: '/api/request/request-procces-status-count',
      method: 'GET',
    },
  });

  console.log('countsData', countsData);

  return (
    <React.Fragment>
      {countsData?.data?.map((table: any, index: number) => (
        <div className="status-table" key={index}>
          <div className="table-header">
            <h3 className="table-title">
              {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
            </h3>
            <h3 className="table-title">{table.total}</h3>
          </div>
          <div className="status-rows">
            {table?.counts?.map((statusItem: any, statusIndex: number) => (
              <div className="status-row" key={statusIndex}>
                <div className="status-name" style={{ color: statusItem.color || '#000' }}>
                  {statusItem.status}
                </div>
                <div className="status-value" style={{ color: statusItem.color || '#000' }}>
                  {statusItem.count ?? 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))} 
    </React.Fragment>
  );
}