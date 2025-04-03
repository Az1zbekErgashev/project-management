import React, { useTransition } from 'react';
import { Card, Col, Row } from 'antd';
import { Bar, Doughnut, Line, Pie, Bubble, Chart, Radar, PolarArea } from 'react-chartjs-2';
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

  const statusDataHelper = (requests: any) => {
    const statusCount =
      requests?.data?.items?.reduce((acc: any, request: any) => {
        if (request.status) {
          acc[request.status] = (acc[request.status] || 0) + 1;
        }
        return acc;
      }, {}) || {};

    return ['ToDo', 'Create', 'Canceled', 'Completed', 'InProgress'].map((status) => statusCount[status] || 0);
  };
  const priorityDataHelper = (requests: any) => {
    const priorityCount =
      requests?.data?.items?.reduce((acc: any, request: any) => {
        if (request?.priority) {
          acc[request.priority] = (acc[request.priority] || 0) + 1;
        }
        return acc;
      }, {}) || {};
    return [t('Urgent'), t('Normal'), t('LowPriority')].map((priority) => priorityCount[priority] || 0);
  };

  const countRequestsByCategory = (requests: any, categoryTitle: string) => {
    return requests?.data?.items?.filter((request: any) => request?.requestStatus?.title === categoryTitle).length;
  };

  const statusData = {
    labels: ['ToDo', 'Create', 'Canceled', 'Completed', 'InProgress'],
    datasets: [
      {
        label: t('request_status'),
        data: statusDataHelper(requests),
        backgroundColor: ['#ffb300', '#1677ff', '#ff4d4f', '#52c41a', '#1890ff'],
      },
    ],
  };

  const priorityData = {
    labels: ['Urgent', 'Normal', 'LowPriority'],
    datasets: [
      {
        label: t('request_priority'),
        data: priorityDataHelper(requests),
        backgroundColor: ['#ff4d4f', '#1677ff', '#73d13d'],
      },
    ],
  };

  const requestStatusData = {
    labels: categories?.data?.map((item: any) => item?.title),
    datasets: [
      {
        label: t('request_category'),
        data: categories?.data?.map((item: any) => countRequestsByCategory(requests, item.title)),
        backgroundColor: ['#1677ff', '#ff9000'],
      },
    ],
  };

  const getMonth = (dateString: any) => new Date(dateString).toLocaleString('en-us', { month: 'short' });

  const monthCount =
    requests?.data?.items?.reduce((acc: any, request: any) => {
      const month = getMonth(request.createdAt);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  const chartData = {
    labels: Object.keys(monthCount),
    datasets: [
      {
        label: t('request_createdAt'),
        data: Object.values(monthCount),
        backgroundColor: '#1677ff',
      },
    ],
  };

  return (
    <StyledHomePage>
      <div className="header-line">
        <h1 className="global-title">{t('requests_statistic')}</h1>
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title={t('request_status')}>
            <Bar data={statusData} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title={t('request_priority')}>
            <Line data={priorityData} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title={t('request_category')}>
            <Chart type="bar" data={requestStatusData} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title={t('request_createdAt')}>
            <Bar data={chartData} />
          </Card>
        </Col>
      </Row>
    </StyledHomePage>
  );
}
