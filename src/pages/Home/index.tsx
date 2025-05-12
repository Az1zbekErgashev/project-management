'use client';

import { useEffect, useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useTranslation } from 'react-i18next';

import { GraphChart, HorizontalChart, LineCharts, BarCharts, StatusCard, HomeFilters } from 'components';
import { ReasonCard } from 'components/HomeComponents/ReasonCard';

const CATEGORY_COLORS: Record<string, string> = {
  와이즈스톤티: '#52E452',
  ICT연구소: '#E0E052',
  '마케팅본부(STF팀)': '#52E0E0',
  더테스트: '#E05252',
};

const statusColors: Record<string, string> = {
  Made: '#4CAF50',
  Failed: '#FF6B6B',
  'On-going': '#2196F3',
  'On-Hold': '#FFA726',
  Dropped: '#9C27B0',
};

export function Dashboard(): JSX.Element {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('Made');
  const [activeTab, setActiveTab] = useState<string>('1');

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

  const { data: pieChartData, refetch: getPieChart } = useQueryApiClient({
    request: {
      url: `/api/request/request-pie-chart?year=${selectedYear}&month=${selectedMonth}`,
    },
  });

  const { data: lineData, refetch: getLineData } = useQueryApiClient({
    request: {
      url: `/api/request/request-line-by-status-chart?year=${selectedYear}&status=${selectedStatus}`,
    },
  });

  useEffect(() => {
    if (selectedYear || selectedMonth) {
      getPieChart();
      getLineChart();
      getLineData();
    }
  }, [selectedYear, selectedMonth]);

  const statusLabels = {
    Made: 'Made',
    'On-hold': 'On-hold',
    'On-going': 'On-going',
    Dropped: 'Dropped',
    Failed: 'Failed',
  } as const;

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
              <div className="metric-value">
                {t('total_percent')} {metric.procent}%
              </div>
              <div className="metric-subtitle">
                {t('total')} {metric.total} {t('request')}
              </div>
            </div>
          ))}
        </div>
        <h2 className="section-title">{t('category_title_count')}</h2>
        <div className="status-tables">
          <StatusCard />
        </div>
        <h2 className="section-title">{t('reason_title_count')}</h2>
        <div className="status-tables">
          <ReasonCard />
        </div>
        <h2 className="section-title">{t('dashboards')}</h2>
        <div className="chart-tabs">
          <HomeFilters
            activeTab={activeTab}
            selectedMonth={selectedMonth}
            selectedStatus={selectedStatus}
            selectedYear={selectedYear}
            setActiveTab={setActiveTab}
            setSelectedMonth={setSelectedMonth}
            setSelectedStatus={setSelectedStatus}
            setSelectedYear={setSelectedYear}
            statusLabels={statusLabels}
          />
        </div>

        {activeTab === '1' && <GraphChart statusColors={statusColors} pieChartData={pieChartData} />}

        {activeTab === '2' && <HorizontalChart statusColors={statusColors} pieChartData={pieChartData} />}

        {activeTab === '3' && <BarCharts CATEGORY_COLORS={CATEGORY_COLORS} reasonData={reasonData} />}

        {activeTab === '4' && (
          <LineCharts lineData={lineData} selectedStatus={selectedStatus} CATEGORY_COLORS={CATEGORY_COLORS} />
        )}
      </div>
    </StyledHomePage>
  );
}
