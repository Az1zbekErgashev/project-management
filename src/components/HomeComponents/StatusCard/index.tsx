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
      {countsData?.data?.map((table: any, index: any) => {
        const total = table.total || 0;

        return (
          <div className="status-table" key={index}>
            <div className="table-header">
              <h3 className="table-title">
                {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
              </h3>
              <h3 className="table-title">
                {total}&nbsp;({total > 0 ? '100%' : '0%'})
              </h3>
            </div>
            <div className="status-rows">
              {PROJECT_STATUS.map((status, statusIndex) => {
                const found = table?.counts?.find((item: any) => item.status === status.text);
                const count = found?.count ?? 0;
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                  <div className="status-row" key={statusIndex}>
                    <div className="status-name" style={{ color: status.color }}>
                      {status.text}
                    </div>
                    <div className="status-value" style={{ color: status.color }}>
                      {count}&nbsp;({percent}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}
