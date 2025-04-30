import { useEffect, useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import MonthlyStatusChart from 'components/Bar';

export function Dashboard() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('1');
  const [selectedYear, setSelectedYear] = useState();
  const tabs = [
    { key: '1', label: t('first_step_dashboard') },
    { key: '2', label: t('second_step_dashboard') },
    { key: '3', label: t('last_step_dashboard') },
  ];

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

  const { data: years } = useQueryApiClient({
    request: {
      url: '/api/request/request-status-years',
    },
    onSuccess(response) {
      if (response.data) {
        setSelectedYear(response?.data?.[0]);
      }
    },
  });

  const { refetch: getYearsCount, data: requestByYears } = useQueryApiClient({
    request: {
      url: `/api/request/request-request-by-years?year=${selectedYear}`,
      disableOnMount: true,
    },
  });

  useEffect(() => {
    if (selectedYear) {
      getYearsCount();
    }
  }, [selectedYear]);

  console.log(activeTab);

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
        <h2 className="section-title">{t('category_title_count')}</h2>
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
        <h2 className="section-title">{t('dashboards')}</h2>
        <div className="chart-tabs">
          <div>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`chart-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {selectedYear && (
            <Select value={selectedYear} onChange={(x: any) => setSelectedYear(x)}>
              {years?.data?.map((item: number, index: number) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>

        {activeTab === '1' && (
          <div className="chart-container">
            <MonthlyStatusChart data={requestByYears?.data} />
          </div>
        )}

        {activeTab === '2' && <div className="chart-container"></div>}

        {activeTab === '3' && <div className="chart-container"></div>}
      </div>
    </StyledHomePage>
  );
}
