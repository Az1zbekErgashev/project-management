'use client';

import { useEffect, useState } from 'react';
import { StyledHomePage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { Select } from 'antd';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface StatusChartData {
  name: string;
  value: number;
  color: string;
}

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

interface ComparisonChartData {
  name: string;
  [category: string]: string | number;
}

interface TabData {
  key: string;
  label: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  와이즈스톤티: '#52E452',
  ICT연구소: '#E0E052',
  '마케팅본부(STF팀)': '#52E0E0',
  더테스트: '#E05252',
};

export function Dashboard(): JSX.Element {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('Made');
  const [activeTab, setActiveTab] = useState<string>('1');
  const tabs: TabData[] = [
    { key: '1', label: t('first_step_dashboard') },
    { key: '2', label: t('second_step_dashboard') },
    { key: '3', label: t('reason_analysis_dashboard') },
    { key: '4', label: t('line_analysis_dashboard') },
  ];

  const statusColors: Record<string, string> = {
    Made: '#4CAF50',
    Failed: '#FF6B6B',
    'On-going': '#2196F3',
    'On-Hold': '#FFA726',
    Dropped: '#9C27B0',
  };

  const statusKeys = ['Made', 'Failed', 'On-going', 'On-Hold', 'Dropped'];

  const getStatusData = (categoryName: string): StatusChartData[] => {
    const categoryData = pieChartData?.data?.find((item: any) => item.Category === categoryName);
    if (!categoryData) return [];

    return [
      { name: 'Made', value: categoryData.Made || 0, color: statusColors.Made },
      { name: 'Failed', value: categoryData.Failed || 0, color: statusColors.Failed },
      { name: 'On-going', value: categoryData['On-going'] || 0, color: statusColors['On-going'] },
      { name: 'On-Hold', value: categoryData['On-Hold'] || 0, color: statusColors['On-Hold'] },
      { name: 'Dropped', value: categoryData.Dropped || 0, color: statusColors.Dropped },
    ];
  };

  const getComparisonData = (): ComparisonChartData[] => {
    return statusKeys.map((status) => {
      const result: ComparisonChartData = { name: status };
      pieChartData?.data?.forEach((category: any) => {
        result[category.Category] = category[status] ?? 0;
      });
      return result;
    });
  };

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

  const { data: countsData } = useQueryApiClient({
    request: {
      url: '/api/request/request-status-count',
      method: 'GET',
    },
  });

  const { data: pieChartData, refetch: getPieChart } = useQueryApiClient({
    request: {
      url: `/api/request/request-pie-chart?year=${selectedYear}&month=${selectedMonth}`,
    },
  });

  const { data: yearData } = useQueryApiClient({
    request: {
      url: `/api/request/request-status-years`,
    },
  });

  const { data: lineData, refetch: getLineData } = useQueryApiClient({
    request: {
      url: `/api/request/request-line-by-status-chart?year=${selectedYear}&status=${selectedStatus}`,
    },
  });

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: statusColors[label] || '#000', fontWeight: 'bold', fontSize: 17 }}
          >{`${label}`}</p>
          {payload.map((entry, index) => (
            <p style={{ fontWeight: 'bold', fontSize: 17 }} key={index} className="value">{`${entry.value} 건`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipForProccesStatus = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const reason = reasonData?.data?.find((item: any) => item.name === label);
      const reasonColor = reason?.color || '#000';
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: reasonColor || '#000', fontWeight: 'bold', fontSize: 17 }}
          >{`${label}`}</p>
          {payload.map((entry, index) => {
            const categoryColor = CATEGORY_COLORS[entry.name || ''] || '#000';
            return (
              <p
                key={index}
                className="value"
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: categoryColor,
                  margin: 0,
                }}
              >
                {entry.name ? `${entry.name} : ${entry.value} 건` : `${entry.value} 건`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (selectedYear || selectedMonth) {
      getPieChart();
      getLineChart();
      getLineData();
    }
  }, [selectedYear, selectedMonth]);

  const getDataKeys = (data: any[]) => {
    if (!data || data.length === 0) return [];

    const firstItem = data[0];
    return Object.keys(firstItem).filter((key) => key !== 'name' && key !== 'color');
  };

  const statusLabels = {
    Made: 'Made',
    'On-hold': 'On-hold',
    'On-going': 'On-going',
    Dropped: 'Dropped',
    Failed: 'Failed',
  } as const;

  const monthMap = {
    Jan: t('jan'),
    Feb: t('feb'),
    Mar: t('mar'),
    Apr: t('apr'),
    May: t('ma'),
    Jun: t('jun'),
    Jul: t('jul'),
    Aug: t('aug'),
    Sep: t('sep'),
    Oct: t('oct'),
    Nov: t('nov'),
    Dec: t('dec'),
  };

  const dataKeys = getDataKeys(reasonData?.data);
  type StatusKey = keyof typeof statusLabels;

  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = reasonData.data.find((item: any) => item.name === payload.value);
    const color = item?.color || '#000';

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-10} y={0} dy={4} textAnchor="end" fill={color} style={{ fontWeight: 'bold' }}>
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomTooltipForAllStatus = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: 10,
            fontSize: 17,
            color: statusColors[label] || '#000',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`item-${index}`}
              style={{
                margin: 0,
                color: entry.color,
                fontWeight: 'bold',
              }}
            >
              {entry.name} : {entry.value} 건
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const CustomTooltipForMonth = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: 10,
            fontSize: 17,
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label && t(label == 'May' ? label : label.toLowerCase())}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`item-${index}`}
              style={{
                margin: 0,
                color: entry.color,
                fontWeight: 'bold',
              }}
            >
              {entry.name} : {entry.value} 건
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

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
              {/* <div className="metric-value">
                {t('total_percent')} {metric.procent}%
              </div> */}
              <div className="metric-subtitle">
                {t('total')} {metric.total} {t('request')}
              </div>
            </div>
          ))}
        </div>
        <h2 className="section-title">{t('category_title_count')}</h2>
        <div className="status-tables">
          {countsData?.data?.map((table: any, index: any) => (
            <div className="status-table" key={index}>
              <div className="table-header">
                <h3 className="table-title">
                  {table.categoryText === 'all_requests' ? t('all_requests') : table.categoryText}
                </h3>
                <h3 className="table-title">{table.total}</h3>
              </div>
              <div className="status-rows">
                {PROJECT_STATUS.map((status, statusIndex) => {
                  const found = table?.counts?.find((item: any) => item.status === status.text);
                  return (
                    <div className="status-row" key={statusIndex}>
                      <div className="status-name" style={{ color: status.color }}>
                        {status.text}
                      </div>
                      <div className="status-value" style={{ color: status.color }}>
                        {found?.count ?? 0}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <h2 className="section-title">{t('dashboards')}</h2>
        <div className="chart-tabs">
          <div>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`chart-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="select-wrap">
            {activeTab !== '4' ? (
              <Select value={selectedMonth} onChange={(x: any) => setSelectedMonth(x)} defaultValue={null}>
                {months?.map((item: any, index: number) => (
                  <Select.Option value={item.value} key={index}>
                    {t(item.label)}
                  </Select.Option>
                ))}
                <Select.Option value={null}>{t('all_month')}</Select.Option>
              </Select>
            ) : (
              <Select value={selectedStatus} onChange={(x: any) => setSelectedStatus(x)} defaultValue={'made'}>
                {Object.keys(statusLabels)?.map((item: any, index: number) => (
                  <Select.Option value={item} key={index}>
                    {statusLabels[item as StatusKey]}
                  </Select.Option>
                ))}
              </Select>
            )}

            <Select value={selectedYear} onChange={(x: any) => setSelectedYear(x)} defaultValue={null}>
              {yearData?.data?.map((item: any, index: number) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
              <Select.Option value={null}>{t('all_year')}</Select.Option>
            </Select>
          </div>
        </div>

        {activeTab === '1' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="company-charts">
                {pieChartData?.data?.map((category: any) => (
                  <div className="chart-card" key={category.CategoryId}>
                    <div className="chart-header">
                      <h4>{category.Category}</h4>
                    </div>
                    <div className="chart-content">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={getStatusData(category.Category)}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 70,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={20}
                            interval={0}
                            tick={({ x, y, payload }: any) => {
                              return (
                                <text
                                  x={x}
                                  y={y + 10}
                                  dx={-10}
                                  dy={10}
                                  textAnchor="end"
                                  fill={statusColors[payload.value] || '#000'}
                                  fontSize={14}
                                  fontWeight="bold"
                                  transform={`rotate(-45, ${x}, ${y})`}
                                >
                                  {payload.value}
                                </text>
                              );
                            }}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="value">
                            {getStatusData(category.Category).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === '2' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="comparison-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={getComparisonData()}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={({ x, y, payload }: any) => {
                        return (
                          <text
                            x={x}
                            y={y + 10}
                            textAnchor="middle"
                            fill={statusColors[payload.value] || '#000'}
                            fontSize={14}
                            fontWeight="bold"
                          >
                            {payload.value}
                          </text>
                        );
                      }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltipForAllStatus />} />
                    <Legend />
                    {pieChartData?.data?.map((category: any, index: number) => (
                      <Bar
                        key={category.CategoryId}
                        dataKey={category.Category}
                        fill={`hsl(${index * 60}, 70%, 60%)`}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === '3' && (
          <div className="chart-container">
            <div className="charts-section">
              <div className="comparison-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={reasonData?.data}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} tick={<CustomYAxisTick />} />
                    <Tooltip content={<CustomTooltipForProccesStatus />} />
                    <Legend />
                    {dataKeys.map((key, index) => (
                      <Bar key={key} dataKey={key} fill={CATEGORY_COLORS[key] || `hsl(${index * 45}, 70%, 50%)`} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === '4' && (
          <div className="charts-section">
            <div className="comparison-chart">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={lineData?.data?.[selectedStatus]}
                  margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    tickFormatter={(month) => monthMap[month as keyof typeof monthMap] || month}
                    dataKey="month"
                    tick={{ fontSize: 14 }}
                  />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    content={<CustomTooltipForMonth />}
                    formatter={(value, name) => {
                      const companyName =
                        name === '와이즈스톤티'
                          ? '와이즈스톤티'
                          : name === 'ICT연구소'
                            ? 'ICT연구소'
                            : name === '마케팅본부(STF팀)'
                              ? '마케팅본부(STF팀)'
                              : name === '더테스트'
                                ? '더테스트'
                                : name;
                      return [value, companyName];
                    }}
                    labelFormatter={(label) => `${monthMap[label as keyof typeof monthMap] || label}`}
                  />
                  <Legend
                    formatter={(value) => {
                      const companyName =
                        value === '와이즈스톤티'
                          ? '와이즈스톤티'
                          : value === 'ICT연구소'
                            ? 'ICT연구소'
                            : value === '마케팅본부(STF팀)'
                              ? '마케팅본부(STF팀)'
                              : value === '더테스트'
                                ? '더테스트'
                                : value;
                      return companyName;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="와이즈스톤티"
                    name="와이즈스톤티"
                    stroke={CATEGORY_COLORS.와이즈스톤티}
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="ICT연구소"
                    name="ICT연구소"
                    stroke={CATEGORY_COLORS.ICT연구소}
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="마케팅본부(STF팀)"
                    name="마케팅본부(STF팀)"
                    stroke={CATEGORY_COLORS['마케팅본부(STF팀)']}
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="더테스트"
                    name="더테스트"
                    stroke={CATEGORY_COLORS.더테스트}
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </StyledHomePage>
  );
}
