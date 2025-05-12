import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export function LineCharts({ lineData, selectedStatus, CATEGORY_COLORS }: any) {
  const { t } = useTranslation();
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
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

  return (
    <div className="charts-section">
      <div className="comparison-chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineData?.data?.[selectedStatus]} margin={{ top: 20, right: 40, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tickFormatter={(month) => monthMap[month as keyof typeof monthMap] || month}
              dataKey="month"
              tick={{ fontSize: 14 }}
            />
            <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 12 }} />
            <Tooltip
              content={<CustomTooltip />}
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
  );
}
