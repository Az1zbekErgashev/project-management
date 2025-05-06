import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const STATUS_COLORS: Record<string, string> = {
  Made: '#4CAF50',
  Failed: '#FF6B6B',
  'On-going': '#2196F3',
  'On-Hold': '#FFA726',
  Dropped: '#9C27B0',
};

const STATUS_KEYS = ['Made', 'Failed', 'On-going', 'On-Hold', 'Dropped'];

const YearlyStatusPieChart = ({ data, year }: any) => {
  const { t } = useTranslation();
  const formattedData = STATUS_KEYS.map((status) => ({
    status,
    count: data?.[status] ?? 0,
  }));

  const total = formattedData?.reduce((sum, item) => sum + item.count, 0);

  return (
    <Pie
      data={{
        labels: total === 0 ? [t('no_data')] : formattedData?.map((d) => d.status),
        datasets: [
          {
            data: total === 0 ? [1] : formattedData.map((d) => d.count),
            backgroundColor: total === 0 ? ['#E0E0E0'] : formattedData.map((d) => STATUS_COLORS[d.status]),
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: `연도별 상태 비율 (${year}년)` },
        },
      }}
    />
  );
};

export default YearlyStatusPieChart;
