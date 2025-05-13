import { useLanguage } from 'contexts/LanguageContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';

export function ReasonCard() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: countsData } = useQueryApiClient({
    request: {
      url: '/api/request/request-procces-status-count',
      method: 'GET',
    },
  });

  return (
    <React.Fragment>
      {countsData?.data?.map((table: any, index: number) => {
        const total = table.total || 0;
        return (
          <div className="status-table" key={index}>
            <div className="table-header">
              <h3 className="table-title">
                {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
              </h3>
              <h3 className="table-count">
                {total}&nbsp;{language === '0' ? '건' : ''}&nbsp;({total > 0 ? '100%' : '0%'})
              </h3>
            </div>
            <div className="status-rows reason-rows">
              {table?.counts?.map((statusItem: any, statusIndex: number) => {
                const count = statusItem.count ?? 0;
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                  <div className="status-row" key={statusIndex}>
                    <button
                      onClick={() =>
                        navigate(
                          `/requests?pageIndex=1&pageSize=10${
                            table?.categoryId ? `&Category=${table?.categoryId}` : ``
                          }&Text=${statusItem.status}`
                        )
                      }
                      className="status-name"
                    >
                      {statusItem.status}
                    </button>
                    <div className="status-value">
                      {count}&nbsp;{language === '0' ? '건' : ''}&nbsp;({percent}%)
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
