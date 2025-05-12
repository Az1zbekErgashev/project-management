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

interface ComparisonChartData {
  name: string;
  [category: string]: string | number;
}

const statusKeys = ['Made', 'Failed', 'On-going', 'On-Hold', 'Dropped'];

export function HorizontalChart({ pieChartData, statusColors }: any) {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
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

  const getComparisonData = (): ComparisonChartData[] => {
    return statusKeys.map((status) => {
      const result: ComparisonChartData = { name: status };
      pieChartData?.data?.forEach((category: any) => {
        result[category.Category] = category[status] ?? 0;
      });
      return result;
    });
  };

  return (
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {pieChartData?.data?.map((category: any, index: number) => (
                <Bar key={category.CategoryId} dataKey={category.Category} fill={`hsl(${index * 60}, 70%, 60%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
