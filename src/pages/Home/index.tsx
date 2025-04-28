import React from 'react';
import { Card, Col, Row, Select, Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledHomePage } from './style';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Type definitions
interface Project {
  department?: string;
  status?: string;
  createdAt?: string;
  dropReason?: string;
}

interface DepartmentSummary {
  name: string;
  total: number;
  percentage: string;
  counts: {
    Made: number;
    Failed: number;
    'On-going': number;
    'On-hold': number;
    Dropped: number;
  };
}

interface CountItem {
  title: string;
  count: number;
}

interface ApiResponse<T> {
  data?: T;
}

interface ProjectsResponse {
  items?: Project[];
}

interface CountsResponse {
  data?: CountItem[];
}

// Constants
const PROJECT_STATUS = [
  { id: 0, text: 'Failed' },
  { id: 1, text: 'Made' },
  { id: 2, text: 'On-going' },
  { id: 3, text: 'On-hold' },
  { id: 4, text: 'Dropped' },
];

const DROP_REASONS = [
  'Failed(인찰실주)',
  'Failed(높은견적)',
  'Failed(인력부족)',
  '당사Dropped(인력부족)',
  '당사Dropped(1인요청)',
  '당사Dropped(자단가)',
  '고객Dropped(고객입찰실주)',
  '고객Dropped(고객내부사항)'
];

const DEPARTMENTS = ['와이즈스톤티', '디테스트', '와이즈스톤'];

export function Dashboard() {
  // API calls
  const { data: requests, isLoading: requestsLoading } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
    },
  });
  console.log("requestsss:", requests?.data?.items);

  const { data: categories, isLoading: categoriesLoading } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const { data: counts, isLoading: countsLoading } = useQueryApiClient({
    request: {
      url: '/api/request/counts',
      method: 'GET',
    },
  });

  console.log("counts:", counts?.data);

  // Data processing functions
  const processDepartmentData = (): DepartmentSummary[] => {
    if (!counts?.data || !requests?.data?.items) return [];
    
    const allCount = counts.data.find((d: { title: string; }) => d.title === 'all')?.count || 1;
    
    return DEPARTMENTS.map(dept => {
      const deptCount = counts.data?.find((d: { title: string; }) => d.title === dept)?.count || 0;
      const deptProjects = requests.data.items?.filter((p: { department: string; }) => p.department === dept) || [];
      
      return {
        name: dept,
        total: deptCount,
        percentage: ((deptCount / allCount) * 100).toFixed(1) + '%',
        counts: {
          Made: deptProjects.filter((p: { status: string; }) => p.status === 'Made').length,
          Failed: deptProjects.filter((p: { status: string; }) => p.status === 'Failed').length,
          'On-going': deptProjects.filter((p: { status: string; }) => p.status === 'On-going').length,
          'On-hold': deptProjects.filter((p: { status: string; }) => p.status === 'On-hold').length,
          Dropped: deptProjects.filter((p: { status: string; }) => p.status === 'Dropped').length,
        }
      };
    });
  };

  const processYearComparisonData = (): ChartData<'bar'> => {
    if (!requests?.data?.items) return { labels: [], datasets: [] };

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    return {
      labels: DEPARTMENTS,
      datasets: [
        {
          label: lastYear.toString(),
          data: DEPARTMENTS.map(dept => 
            requests.data.items?.filter((p: { createdAt: string | number | Date; department: string; }) => {
              if (!p.createdAt) return false;
              const date = new Date(p.createdAt);
              return p.department === dept && date.getFullYear() === lastYear;
            }).length || 0
          ),
          backgroundColor: '#1890ff',
          borderRadius: 4,
        },
        {
          label: currentYear.toString(),
          data: DEPARTMENTS.map(dept => 
            requests.data.items?.filter((p: { createdAt: string | number | Date; department: string; }) => {
              if (!p.createdAt) return false;
              const date = new Date(p.createdAt);
              return p.department === dept && date.getFullYear() === currentYear;
            }).length || 0
          ),
          backgroundColor: '#13c2c2',
          borderRadius: 4,
        },
      ],
    };
  };

  const processDropReasonData = (): ChartData<'bar'> => {
    if (!requests?.data?.items) return { labels: [], datasets: [] };
    
    return {
      labels: DROP_REASONS,
      datasets: DEPARTMENTS.map(dept => ({
        label: dept,
        data: DROP_REASONS.map(reason => {
          const reasonText = reason.split('(')[1].replace(')', '');
            return requests.data.items?.filter((p: Project) => 
            p.department === dept && 
            (p.status === 'Failed' || p.status === 'Dropped') && 
            p.dropReason === reasonText
            ).length || 0;
        }),
        backgroundColor: 
          dept === '와이즈스톤티' ? '#722ed1' : 
          dept === '디테스트' ? '#faad14' : '#f5222d',
      }))
    };
  };

  const processMonthlyStatusData = (): ChartData<'bar'> => {
    if (!requests?.data?.items) return { labels: [], datasets: [] };

    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const currentYear = new Date().getFullYear();
    
    interface MonthlyStatusDataset {
      label: string;
      data: number[];
      backgroundColor: string;
    }

    interface MonthlyStatusData {
      labels: string[];
      datasets: MonthlyStatusDataset[];
    }

    return {
      labels: months.slice(0, new Date().getMonth() + 1), // Only show up to current month
      datasets: PROJECT_STATUS.map<MonthlyStatusDataset>(status => ({
      label: status.text,
      data: months.map((_, index) => 
        requests.data.items?.filter((p: { createdAt: string | number | Date; status: string; }) => {
        if (!p.createdAt) return false;
        const date = new Date(p.createdAt);
        return p.status === status.text && 
             date.getMonth() === index &&
             date.getFullYear() === currentYear;
        }).length || 0
      ).slice(0, new Date().getMonth() + 1),
      backgroundColor: 
        status.text === 'Made' ? '#52c41a' :
        status.text === 'Failed' ? '#f5222d' :
        status.text === 'On-going' ? '#1890ff' :
        status.text === 'On-hold' ? '#faad14' : '#722ed1',
      }))
    } as MonthlyStatusData;
  };

  // Chart options
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      x: { stacked: false },
      y: { stacked: false, beginAtZero: true },
    },
  };

  const stackedBarOptions: ChartOptions<'bar'> = {
    ...barOptions,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  // Process all data
  const departmentData = processDepartmentData();
  const yearComparisonData = processYearComparisonData();
  const dropReasonData = processDropReasonData();
  const monthlyStatusData = processMonthlyStatusData();
  const isLoading = requestsLoading || categoriesLoading || countsLoading;

  if (isLoading) {
    return (
      <StyledHomePage>
        <div className="loading-container">
          <Spin size="large" />
        </div>
      </StyledHomePage>
    );
  }

  return (
    <StyledHomePage>
      <div className="dashboard-container">
        <h1>WISESTONE CRM 대시보드</h1>
        
        {/* Project Request Summary */}
        <div className="section">
          <h2>각 번안별 연도별 신규 프로젝트 의뢰 건 수 파악</h2>
          <div className="project-request-summary">
            {departmentData.map((dept, index) => (
              <div key={index} className="request-item">
                <div className="dept-name">{dept.name}</div>
                <div className="dept-percentage">{dept.percentage}</div>
                <div className="dept-total">중 {dept.total}건</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Status Summary */}
        <div className="section">
          <h2>부서별 상태 요약</h2>
          <div className="department-status">
            {departmentData.map((dept, index) => (
              <Card key={index} className="department-card">
                <div className="dept-header">
                  <h3>{dept.name}</h3>
                  <div className="dept-total">중 {dept.total}건</div>
                </div>
                <div className="status-list">
                  {Object.entries(dept.counts).map(([status, count]) => (
                    <div key={status} className="status-item">
                      <span className="status-label">{status}</span>
                      <span className="status-count">{count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Year Comparison */}
        <div className="section">
          <div className="tab-header">
            <div className="tab active">연도별 비교</div>
            <div className="tab">월별 상태 비교</div>
            <div className="tab">Drop 사유 분석</div>
          </div>

          <Card className="chart-card">
            <div className="chart-header">
              <h3>연도별 비교</h3>
              <Select 
                defaultValue="전체"
                style={{ width: 120 }}
                options={[
                  { value: '전체', label: '전체' },
                  { value: '2023', label: '2023' },
                  { value: '2024', label: '2024' },
                ]}
              />
            </div>
            <div className="chart-container">
              <Bar data={yearComparisonData} options={barOptions} />
            </div>
          </Card>
        </div>

        {/* Drop Reason Analysis */}
        <div className="section">
          <Card className="chart-card">
            <div className="chart-header">
              <h3>Drop 사유 분석</h3>
            </div>
            <div className="chart-container">
              <Bar data={dropReasonData} options={barOptions} />
            </div>
          </Card>
        </div>

        {/* Monthly Status */}
        <div className="section">
          <Card className="chart-card">
            <div className="chart-header">
              <h3>월별 상태 비교</h3>
              <Select 
                defaultValue="전체"
                style={{ width: 120 }}
                options={[
                  { value: '전체', label: '전체' },
                  ...Array.from({ length: new Date().getMonth() + 1 }, (_, i) => ({ 
                    value: `${i+1}월`, 
                    label: `${i+1}월` 
                  }))
                ]}
              />
            </div>
            <div className="chart-container">
              <Bar data={monthlyStatusData} options={stackedBarOptions} />
            </div>
          </Card>
        </div>
      </div>
    </StyledHomePage>
  );
}