import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export function BarCharts({ reasonData, CATEGORY_COLORS }: any) {
  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = reasonData?.data?.find((item: any) => item.name === payload.value);
    const color = item?.color || '#000';

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-10} y={0} dy={4} textAnchor="end" fill={color} style={{ fontWeight: 'bold' }}>
          {payload.value}
        </text>
      </g>
    );
  };

  const getDataKeys = (data: any[]) => {
    if (!data || data.length === 0) return [];

    const firstItem = data[0];
    return Object.keys(firstItem).filter((key) => key !== 'name' && key !== 'color');
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
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

  const dataKeys = getDataKeys(reasonData?.data);

  return (
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={CATEGORY_COLORS[key] || `hsl(${index * 45}, 70%, 50%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
