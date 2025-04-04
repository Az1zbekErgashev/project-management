import { Layout, Row, Col, Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Bar, Doughnut, Line, Bubble, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BubbleController,
} from 'chart.js';
import StatusCard from './statrus';
import { StyledHomePage } from './style';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BubbleController
);

const { Header, Content } = Layout;
const { Title: AntTitle } = Typography;

export function Home() {
  // Bar chart data
  const barData = {
    labels: ['0.8', '1.0', '0.1', '0.2', '1.3', '0.1', '1.1', '4.1', '0.1'],
    datasets: [
      {
        label: 'Te tota',
        data: [60, 75, 60, 80, 65, 90, 70, 95, 85],
        backgroundColor: '#4F7CFF',
      },
      {
        label: 'Posse',
        data: [50, 65, 50, 70, 55, 80, 60, 85, 75],
        backgroundColor: '#FF6B8A',
      },
      {
        label: 'Vis an',
        data: [40, 55, 40, 60, 45, 70, 50, 75, 65],
        backgroundColor: '#FF9F7B',
      },
      {
        label: 'Facer',
        data: [30, 45, 30, 50, 35, 60, 40, 65, 55],
        backgroundColor: '#37CFBA',
      },
      {
        label: 'Electron',
        data: [20, 35, 20, 40, 25, 50, 30, 55, 45],
        backgroundColor: '#CF7BFF',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'TRANSITION',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold' as const, // Explicitly type as "bold"
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  // Doughnut chart data
  const doughnutData = {
    labels: ['32.1%', '8%', '4.5%', '12%', '24.2%', '3.2%', '8.1%'],
    datasets: [
      {
        data: [32.1, 8, 4.5, 12, 24.2, 3.2, 8.1],
        backgroundColor: ['#4F7CFF', '#37CFBA', '#FF6B8A', '#CF7BFF', '#FF9F7B', '#6B8AFF', '#37CFBA'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'SALES',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold' as const, // Explicitly type as "bold"
        },
      },
    },
  };

  // Curved line chart data
  const curvedLineData = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'A',
        data: [50, 90, 90, 50],
        borderColor: '#CF7BFF',
        backgroundColor: 'rgba(207, 123, 255, 0.1)',
        tension: 0.4,
        borderWidth: 4,
      },
      {
        label: 'B',
        data: [40, 80, 80, 40],
        borderColor: '#37CFBA',
        backgroundColor: 'rgba(55, 207, 186, 0.1)',
        tension: 0.4,
        borderWidth: 4,
      },
      {
        label: 'C',
        data: [30, 70, 70, 30],
        borderColor: '#FF6B8A',
        backgroundColor: 'rgba(255, 107, 138, 0.1)',
        tension: 0.4,
        borderWidth: 4,
      },
      {
        label: 'D',
        data: [20, 60, 60, 20],
        borderColor: '#4F7CFF',
        backgroundColor: 'rgba(79, 124, 255, 0.1)',
        tension: 0.4,
        borderWidth: 4,
      },
    ],
  };

  const curvedLineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'PRODUCT STATISTIC',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold' as const, // Explicitly type as "bold"
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  // Bubble chart data
  const bubbleData = {
    datasets: [
      {
        label: 'Finance 123.9',
        data: [{ x: 3, y: 3, r: 20 }],
        backgroundColor: 'rgba(255, 107, 138, 0.7)',
      },
      {
        label: 'Finance 5.2',
        data: [{ x: 7, y: 7, r: 15 }],
        backgroundColor: 'rgba(55, 207, 186, 0.7)',
      },
      {
        label: 'Finance 18.3',
        data: [{ x: 3, y: 7, r: 18 }],
        backgroundColor: 'rgba(207, 123, 255, 0.7)',
      },
      {
        label: 'Finance 11.5',
        data: [{ x: 5, y: 5, r: 12 }],
        backgroundColor: 'rgba(220, 220, 220, 0.7)',
      },
    ],
  };

  const bubbleOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'FINANCE',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold' as const, // Explicitly type as "bold"
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        beginAtZero: true,
        display: false,
      },
    },
  };

  // Radar chart data
  const radarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Activity',
        data: [65, 59, 90, 81, 56, 55, 40, 65, 59, 90, 81, 56],
        backgroundColor: 'rgba(79, 124, 255, 0.2)',
        borderColor: 'rgba(79, 124, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: '#4F7CFF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4F7CFF',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'ACTIVITY',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold' as const, // Explicitly type as "bold"
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  // Bottom bar chart data
  const bottomBarData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Facer',
        data: [12, 19, 13, 15, 12],
        backgroundColor: '#37CFBA',
      },
    ],
  };

  const bottomBarData2 = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Vis an',
        data: [22, 19, 23, 25, 22],
        backgroundColor: '#4F7CFF',
      },
    ],
  };

  const bottomBarData3 = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Posse',
        data: [15, 19, 13, 15, 12],
        backgroundColor: '#FF6B8A',
      },
    ],
  };

  const bottomBarData4 = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Te tota',
        data: [18, 19, 23, 15, 22],
        backgroundColor: '#CF7BFF',
      },
    ],
  };

  const bottomBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  // Status cards data
  const statusCards = [
    { title: 'Pending', value: 0, color: '#f0f0f0' },
    { title: 'InProgress', value: 4658, color: '#FFCA28' },
    { title: 'Completed', value: 1, color: '#4CAF50' },
    { title: 'Rejected', value: 4, color: '#2196F3' },
    { title: 'Medium', value: 0, color: '#f0f0f0' },
    { title: 'Low', value: 4659, color: '#FFCA28' },
    { title: 'High', value: 4, color: '#4CAF50' },
    { title: '와이즈스토리', value: 772, color: '#2196F3' },
    { title: 'ICT연구소', value: 3755, color: '#FF6B8A' },
    { title: '디테스트', value: 70, color: '#f0f0f0' },
    { title: '마케팅본부(STF팀)', value: 65, color: '#4CAF50' },
    { title: 'CRM', value: 1, color: '#2196F3' },
    { title: 'All', value: 4663, color: '#FF6B8A' },
  ];

  return (
    <StyledHomePage>
      <Layout className="dashboard-layout">
        <Header className="dashboard-header">
          <AntTitle level={3}>Dashboard</AntTitle>
        </Header>
        <Content className="dashboard-content">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card className="chart-card">
                <Bar data={barData} options={barOptions} />
                <div className="year-label">
                  <span>2020</span>
                  <div className="metrics">
                    <div>
                      <span>Te tota</span>
                      <span>15.2%</span>
                    </div>
                    <div>
                      <span>Posse</span>
                      <span>4.42%</span>
                    </div>
                    <div>
                      <span>Vis an</span>
                      <span>58.5</span>
                    </div>
                    <div>
                      <span>Facer</span>
                      <span>416.7</span>
                    </div>
                    <div>
                      <span>Electron</span>
                      <span>427.9</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="chart-card product-statistic">
                <Line data={curvedLineData} options={curvedLineOptions} />
                <div className="product-value">
                  <div className="main-value">715.8 $</div>
                  <div className="percentage-up">+11%</div>
                  <div className="metrics">
                    <div>
                      <span className="dot purple"></span>
                      <span>70.3%</span>
                    </div>
                    <div>
                      <span className="dot teal"></span>
                      <span>55.4</span>
                    </div>
                    <div>
                      <span className="dot red"></span>
                      <span>42.8</span>
                    </div>
                    <div>
                      <span className="dot blue"></span>
                      <span>45.5%</span>
                    </div>
                  </div>
                  <div className="description">Diferença para o campo faturado bruto</div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-16">
            <Col xs={24} md={8}>
              <Card className="chart-card sales-card">
                <div className="center-content">
                  <div className="inner-circle">
                    <span className="currency">$</span>
                    <div className="value">125.5</div>
                  </div>
                </div>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div className="total-value">
                  <div className="value">$ 1532,15</div>
                  <div className="percentage-up">
                    <ArrowUpOutlined /> +74.5%
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="chart-card">
                <Bubble data={bubbleData} options={bubbleOptions} />
                <div className="finance-metrics">
                  <div>
                    <span className="dot red"></span>
                    <span>12%</span>
                  </div>
                  <div>
                    <span className="dot purple"></span>
                    <span>55.7</span>
                  </div>
                  <div>
                    <span className="dot teal"></span>
                    <span>13.7</span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="chart-card activity-card">
                <Radar data={radarData} options={radarOptions} />
                <div className="center-content">
                  <div className="activity-value">
                    <div className="value">32.5 K</div>
                    <div className="percentage-up">
                      <ArrowUpOutlined /> +9%
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-16">
            <Col xs={24}>
              <Card className="chart-card bottom-charts">
                <Row gutter={[16, 0]}>
                  <Col xs={6}>
                    <div className="bottom-chart-container">
                      <div className="chart-title">Facer</div>
                      <Bar data={bottomBarData} options={bottomBarOptions} height={80} />
                      <div className="percentage-up">
                        <ArrowUpOutlined /> +5%
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="bottom-chart-container">
                      <div className="chart-title">Vis an</div>
                      <Bar data={bottomBarData2} options={bottomBarOptions} height={80} />
                      <div className="percentage-down">
                        <ArrowDownOutlined /> -2%
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="bottom-chart-container">
                      <div className="chart-title">Posse</div>
                      <Bar data={bottomBarData3} options={bottomBarOptions} height={80} />
                      <div className="percentage-up">
                        <ArrowUpOutlined /> +10%
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="bottom-chart-container">
                      <div className="chart-title">Te tota</div>
                      <Bar data={bottomBarData4} options={bottomBarOptions} height={80} />
                      <div className="percentage-down">
                        <ArrowDownOutlined /> -35%
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-16">
            {statusCards.map((card, index) => (
              <Col xs={12} sm={8} md={6} lg={4} xl={3} key={index}>
                <StatusCard title={card.title} value={card.value} color={card.color} />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </StyledHomePage>
  );
}
