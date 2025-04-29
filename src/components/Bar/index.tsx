import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthNames: Record<number, string> = {
  1: '1월',
  2: '2월',
  3: '3월',
  4: '4월',
  5: '5월',
  6: '6월',
  7: '7월',
  8: '8월',
  9: '9월',
  10: '10월',
  11: '11월',
  12: '12월',
};

const STATUS_COLORS: Record<string, string> = {
  Made: '#4CAF50',
  Failed: '#FF6B6B',
  'On-going': '#2196F3',
  'On-Hold': '#FFA726',
  Dropped: '#9C27B0',
};

const MonthlyStatusChart = ({ data }: any) => {
  const labels = data?.map((d: any) => monthNames[d.month]);
  const { t } = useTranslation();
  const statusKeys = ['Made', 'Failed', 'On-going', 'OnHold', 'Dropped'];

  const datasets = statusKeys.map((status) => ({
    label: status,
    data: data?.map((d: any) => d[status as keyof typeof d] || 0),
    backgroundColor: STATUS_COLORS[status],
  }));

  return (
    <Bar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: t('monthly_status_data') },
        },
      }}
    />
  );
};

export default MonthlyStatusChart;
