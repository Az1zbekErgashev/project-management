'use client';

import { useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CategoryStatusData {
  CategoryId: number;
  Category: string;
  Made: number;
  Failed: number;
  'On-going': number;
  'On-Hold': number;
  Dropped: number;
  [key: string]: string | number;
}



interface StatusChartData {
  name: string;
  value: number;
  color: string;
}

interface ComparisonChartData {
  name: string;
  [category: string]: string | number;
}

interface TabData {
  key: string;
  label: string;
}

export function Dashboard(): JSX.Element {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<string>('2'); // Set to second tab by default
  const tabs: TabData[] = [
    { key: '1', label: t('first_step_dashboard') },
    { key: '2', label: t('second_step_dashboard') },
  ];

  const statusColors: Record<string, string> = {
    Made: '#4CAF50', // Green
    Failed: '#FF6B6B', // Red
    'On-going': '#2196F3', // Blue
    'On-Hold': '#FFA726', // Orange
    Dropped: '#9C27B0', // Purple
  };

  const statusKeys = ['Made', 'Failed', 'On-going', 'On-Hold', 'Dropped'];

  const getStatusData = (categoryName: string): StatusChartData[] => {
    const categoryData = pieChartData?.data?.find((item: any) => item.Category === categoryName);
    if (!categoryData) return [];

    return statusKeys?.map((key) => ({
      name: key,
      value: categoryData[key] as number,
      color: statusColors[key],
    }));
  };

  const getComparisonData = (): ComparisonChartData[] => {
    return statusKeys.map((status) => {
      const result: ComparisonChartData = { name: status };
      pieChartData?.data?.forEach((category: any) => {
        result[category.Category] = category[status] ?? 0;
      });
      return result;
    });
  };

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

  const { data: pieChartData } = useQueryApiClient({
    request: {
      url: `/api/request/request-pie-chart`,
    },
  });

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; name: string }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
        </div>

        {activeTab === '1' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="company-charts">
                {pieChartData?.data?.map((category: any) => (
                  <div className="chart-card" key={category.CategoryId}>
                    <div className="chart-header">
                      <h4>{category.Category}</h4>
                    </div>
                    <div className="chart-content">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={getStatusData(category.Category)}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" ticks={statusKeys} />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="value">
                            {getStatusData(category.Category).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === '2' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="comparison-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={getComparisonData()}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {pieChartData?.data?.map((category: any, index: number) => (
                      <Bar
                        key={category.CategoryId}
                        dataKey={category.Category}
                        fill={`hsl(${index * 60}, 70%, 60%)`}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledHomePage>
  );
}
