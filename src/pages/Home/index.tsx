import React from 'react';
import { Card, Col, Row } from 'antd';
import { Pie, Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

export function Dashboard() {
  const { t } = useTranslation();

  const { data: requests } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
    },
  });

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const { data: counts } = useQueryApiClient({
    request: {
      url: '/api/request/counts',
      method: 'GET',
    },
  });

  const statusDataHelper = (requests: { data: { items: any[]; }; }) => {
    const statusCount =
      requests?.data?.items?.reduce((acc: { [x: string]: any; }, request: { status: string | number; }) => {
        if (request.status) {
          acc[request.status] = (acc[request.status] || 0) + 1;
        }
        return acc;
      }, {}) || {};
    return ['Pending', 'Canceled', 'Completed', 'InProgress'].map((status) => statusCount[status] || 0);
  };

  const priorityDataHelper = (requests: { data: { items: any[]; }; }) => {
    const priorityCount =
      requests?.data?.items?.reduce((acc: { [x: string]: any; }, request: { priority: string | number; }) => {
        if (request?.priority) {
          acc[request.priority] = (acc[request.priority] || 0) + 1;
        }
        return acc;
      }, {}) || {};
    return [t('High'), t('Medium'), t('Low')].map((priority) => priorityCount[priority] || 0);
  };

  const countRequestsByCategory = (requests: { data: { items: { filter: (arg0: (request: any) => boolean) => { (): any; new(): any; length: any; }; }; }; }, categoryTitle: any) => {
    return requests?.data?.items?.filter((request) => request?.requestStatus?.title === categoryTitle).length || 0;
  };

  const getMonth = (dateString: string | number | Date) => new Date(dateString).toLocaleString('en-us', { month: 'short' });

  const monthCount =
    requests?.data?.items?.reduce((acc: { [x: string]: any; }, request: { createdAt: any; }) => {
      const month = getMonth(request.createdAt);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  // Pie Chart Data
  const statusData: ChartData<'pie'> = {
    labels: ['Pending', 'Canceled', 'Completed', 'InProgress'],
    datasets: [
      {
        label: t('request_status'),
        data: statusDataHelper(requests),
        backgroundColor: ['#ff6f61', '#1677ff', '#52c41a', '#ffb300'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Doughnut Chart Data (Request Priority)
  const priorityData: ChartData<'doughnut'> = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: t('request_priority'),
        data: priorityDataHelper(requests),
        backgroundColor: ['#13c2c2', '#73d13d', '#ff4d4f'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Bar Chart Data
  const requestStatusData: ChartData<'bar'> = {
    labels: categories?.data?.map((item: { title: any; }) => item?.title),
    datasets: [
      {
        label: t('request_category'),
        data: categories?.data?.map((item: { title: any; }) => countRequestsByCategory(requests, item.title)),
        backgroundColor: '#722ed1',
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 20,
      },
    ],
  };

  // Area Chart Data
  const chartData: ChartData<'line'> = {
    labels: Object.keys(monthCount),
    datasets: [
      {
        label: t('request_createdAt'),
        data: Object.values(monthCount),
        backgroundColor: 'rgba(250, 204, 21, 0.2)',
        borderColor: '#facc15',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const statusTypes = ['Pending', 'InProgress', 'Completed', 'Canceled'];
  const priorityTypes = ['High', 'Medium', 'Low'];
  const categoryTypes = ['와이즈스톤티', 'ICT연구소', '더테스트', '마케팅본부(STF팀)', 'CRM', 'All'];

  const renderCountsByType = () => {
    if (!counts?.data) return <div className="loading">Loading...</div>;

    const statusItems = counts.data.filter((item: { title: string; }) => statusTypes.includes(item.title));
    const priorityItems = counts.data.filter((item: { title: string; }) => priorityTypes.includes(item.title));
    const categoryItems = counts.data.filter((item: { title: string; }) => categoryTypes.includes(item.title));

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
          <div className="stats-section">
            <h2>{t('request_status')}</h2>
            <div className="stats-group">
              {statusItems.map((item: { title: any | string | string[]; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="count-item">
                  <span className="count-title">{t(item.title)}</span>
                  <span className="count-value">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stats-section" style={{ flex: 1, minWidth: '300px' }}>
            <h2>{t('request_priority')}</h2>
            <div className="stats-group">
              {priorityItems.map((item: { title: any | string | string[]; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="count-item">
                  <span className="count-title">{t(item.title)}</span>
                  <span className="count-value">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="stats-section">
          <h2>{t('request_category')}</h2>
          <div className="stats-group">
            {categoryItems.map((item: { title: any | string | string[]; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
              <div key={index} className="count-item">
                <span className="count-title">{t(item.title)}</span>
                <span className="count-value">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  // Chart options
  const pieOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, font: { size: 14 } },
      },
      tooltip: { backgroundColor: '#333', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutBounce',
    },
    maintainAspectRatio: false,
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
    maintainAspectRatio: false,
    circumference: 360,
    rotation: 0,
  };

  const barOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#333', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
    animation: false,
    maintainAspectRatio: false,
  };

  const areaOptions: ChartOptions<'line'> = {
    plugins: {
      legend: { position: 'top', labels: { padding: 20, font: { size: 14 } } },
      tooltip: { backgroundColor: '#333', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } },
    },
    animation: false,
    maintainAspectRatio: false,
  };

  return (
    <StyledHomePage>
      <div className="dashboard-header">
        <h1 className="dashboard-title">{t('requests_statistic')}</h1>
      </div>
      <div className="header-stats">{renderCountsByType()}</div>
      <br />
      <div className="chart-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title={t('request_status')}>
              <div style={{ height: '300px' }}>
                <Pie data={statusData} options={pieOptions} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title={t('request_priority')}>
              <div style={{ height: '300px' }}>
                <Doughnut data={priorityData} options={doughnutOptions} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title={t('request_category')}>
              <div style={{ height: '300px' }}>
                <Bar data={requestStatusData} options={barOptions} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title={t('request_createdAt')}>
              <div style={{ height: '300px' }}>
                <Line data={chartData} options={areaOptions} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </StyledHomePage>
  );
}