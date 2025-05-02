'use client';

import { useEffect, useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Select } from 'antd';

interface StatusChartData {
  name: string;
  value: number;
  color: string;
}

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

interface ComparisonChartData {
  name: string;
  [category: string]: string | number;
}

interface TabData {
  key: string;
  label: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  와이즈스톤티: '#52E452',
  ICT연구소: '#E0E052',
  '마케팅본부(STF팀)': '#52E0E0',
  더테스트: '#E05252',
};

export function Dashboard(): JSX.Element {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  const [activeTab, setActiveTab] = useState<string>('1');
  const tabs: TabData[] = [
    { key: '1', label: t('first_step_dashboard') },
    { key: '2', label: t('second_step_dashboard') },
    { key: '3', label: t('reason_analysis_dashboard') },
  ];

  const statusColors: Record<string, string> = {
    Made: '#4CAF50',
    Failed: '#FF6B6B',
    'On-going': '#2196F3',
    'On-Hold': '#FFA726',
    Dropped: '#9C27B0',
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

  const { data: reasonData, refetch: getLineChart } = useQueryApiClient({
    request: {
      url: `/api/request/request-line-chart?year=${selectedYear}&month=${selectedMonth}`,
      method: 'GET',
    },
  });

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

  const { data: pieChartData, refetch: getPieChart } = useQueryApiClient({
    request: {
      url: `/api/request/request-pie-chart?year=${selectedYear}&month=${selectedMonth}`,
    },
  });

  const { data: yearData } = useQueryApiClient({
    request: {
      url: `/api/request/request-status-years`,
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
          {payload.map((entry, index) => (
            <p key={index} className="value">{`${entry.name}: ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (selectedYear || selectedMonth) {
      getPieChart();
      getLineChart();
    }
  }, [selectedYear, selectedMonth]);

  const getDataKeys = (data: any[]) => {
    if (!data || data.length === 0) return [];

    const firstItem = data[0];
    return Object.keys(firstItem).filter((key) => key !== 'name');
  };

  const dataKeys = getDataKeys(reasonData?.data);

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
          <div className='select-wrap'>
            <Select value={selectedMonth} onChange={(x: any) => setSelectedMonth(x)} defaultValue={null}>
              {months?.map((item: any, index: number) => (
                <Select.Option value={item.value} key={index}>
                  {item.label}
                </Select.Option>
              ))}
              <Select.Option value={null}>{t('all_month')}</Select.Option>
            </Select>
            <Select value={selectedYear} onChange={(x: any) => setSelectedYear(x)} defaultValue={null}>
              {yearData?.data?.map((item: any, index: number) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
              <Select.Option value={null}>{t('all_year')}</Select.Option>
            </Select>
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

        {activeTab === '3' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="comparison-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={reasonData?.data}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {dataKeys.map((key, index) => (
                      <Bar key={key} dataKey={key} fill={CATEGORY_COLORS[key] || `hsl(${index * 45}, 70%, 50%)`} />
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
