import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface StatusChartData {
  name: string;
  value: number;
  color: string;
}

export function GraphChart({ pieChartData, statusColors }: any) {
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

  return (
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
  );
}
