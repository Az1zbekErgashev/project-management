import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Layout } from 'antd';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
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
import { Content } from 'antd/es/layout/layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const API_URL = 'api/logs/filter';

export function Dashboard() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [3000, 4000, 3800, 5000, 4700, 6000, 7000],
        borderColor: '#1677ff', // Синий цвет линии
        backgroundColor: 'rgba(22, 119, 255, 0.2)',
        fill: true, // Заполняем под линией
        tension: 0.3, // Плавные линии
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false } }, // Убираем легенду
    scales: { x: { display: false }, y: { display: false } }, // Убираем оси
    maintainAspectRatio: false,
  };
  return (
    <Content>
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} md={12}>
          <Card title="Sales Chart">
            <Bar data={chartData} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Revenue Chart">
            <Line data={chartData} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
}
