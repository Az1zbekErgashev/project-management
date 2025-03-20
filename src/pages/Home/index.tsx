import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { StyledHomePage } from './style';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = 'api/logs/filter';

export function HomePage() {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Users by Role',
        data: [],
        backgroundColor: 'rgba(27, 143, 143, 0.6)',
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}?PageIndex=1&PageSize=10`);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const roles = data.map((user) => `User ${user.UserId}`);
          const roleCounts = data.map((user) => user.Role || 0);

          setChartData({
            labels: roles,
            datasets: [
              {
                label: 'User Roles',
                data: roleCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Roles Data',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Users',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Roles',
        },
      },
    },
  };

  return (
    <StyledHomePage>
      <div className="main-chart">
        <div className="top-chart">
          <h2>User Role Distribution</h2>
          <Bar data={chartData} options={options} />
        </div>

        <div className="big-chart">
          <div className="chart-left">Chart left</div>
          <div className="chart-right">Chart right</div>
        </div>
      </div>
    </StyledHomePage>
  );
}
