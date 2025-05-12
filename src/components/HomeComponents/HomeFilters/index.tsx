import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';

interface TabData {
  key: string;
  label: string;
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

interface props {
  statusLabels: any;
  selectedStatus: any;
  activeTab: any;
  setActiveTab: any;
  setSelectedMonth: any;
  selectedMonth: any;
  setSelectedStatus: any;
  selectedYear: any;
  setSelectedYear: any;
}
export function HomeFilters({
  activeTab,
  selectedMonth,
  selectedStatus,
  setActiveTab,
  setSelectedMonth,
  setSelectedStatus,
  statusLabels,
  selectedYear,
  setSelectedYear,
}: props) {
  const { t } = useTranslation();
  const tabs: TabData[] = [
    { key: '1', label: t('first_step_dashboard') },
    { key: '2', label: t('second_step_dashboard') },
    { key: '3', label: t('reason_analysis_dashboard') },
    { key: '4', label: t('line_analysis_dashboard') },
  ];

  const { data: yearData } = useQueryApiClient({
    request: {
      url: `/api/request/request-status-years`,
    },
  });

  type StatusKey = keyof typeof statusLabels;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
