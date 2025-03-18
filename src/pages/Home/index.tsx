import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data: ChartData<'bar'> = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [50, 80, 40, 90, 70],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales Data',
    },
  },
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Sales',
      },
    },
  },
};

// HomePage Component
export function HomePage() {
  return (
    <div className="container">
      <header>
        <h1>Welcome to My Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <h2>Sales Overview</h2>
        <Bar data={data} options={options} />
      </main>

      <footer>
        <p>&copy; 2025 My Company</p>
      </footer>
    </div>
  );
};

