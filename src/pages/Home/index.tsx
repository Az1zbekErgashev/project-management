import { useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('월별 상태 비교');
  const [activeChartType, setActiveChartType] = useState('bar');

  const tabs = ['월별 상태 비교', '연도별 비교', 'Drop 사유 분석'];

  const { data: procentData } = useQueryApiClient({
    request: {
      url: '/api/request/request-procent',
      method: 'GET',
    },
  });

  const { data: countsData } = useQueryApiClient({
    request: {
      url: '/api/request/request-status-count',
      method: 'GET',
    },
  });

  return (
    <StyledHomePage>
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>{t('dashboard_title')}</h1>
        </header>
        <div className="metric-cards">
          {procentData?.data?.map((metric: any, index: number) => (
            <div className="metric-card" key={index}>
              <div className="metric-title">
                {metric.categoryText === 'all_requests' ? t('all_requests') : metric.categoryText}
              </div>
              <div className="metric-value">{metric.procent}%</div>
              <div className="metric-subtitle">{metric.total}</div>
            </div>
          ))}
        </div>
        <h2 className="section-title">부서별 처리 상태 요약</h2>
        <div className="status-tables">
          {countsData?.data?.map((table: any, index: number) => (
            <div className="status-table" key={index}>
              <div className="table-header">
                <h3 className="table-title">
                  {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
                </h3>
                <h3 className="table-title">{table.total}</h3>
              </div>
              <div className="status-rows">
                {PROJECT_STATUS.map((status, statusIndex) => {
                  const found = table.counts.find((item: any) => item.status === status.text);
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
        </div>
        <h2 className="section-title">상태 데이터 그래프</h2>
        <div className="chart-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === '월별 상태 비교' && (
          <div className="chart-container">
         
          </div>
        )}

        {activeTab === 'Drop 사유 분석' && (
          <div className="chart-container"></div>
        )}

        {activeTab === '연도별 비교' && (
          <div className="chart-container">{/* <YearlyComparisonChart data={yearlyComparisonData} /> */}</div>
        )}
      </div>
    </StyledHomePage>
  );
}
