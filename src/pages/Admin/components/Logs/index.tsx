import React from 'react';
import { Table, Select, DatePicker, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import Pagination from 'ui/Pagination/Pagination';
import dayjs from 'dayjs';
import useLogsApi from './components/useLogsApi';

export function Logs() {
  const { t } = useTranslation();
  const { logs, users, queryParams, setQueryParams, isLogsLoading } = useLogsApi();

  const handleFilterChange = (key: keyof typeof queryParams, value: any) => {
    setQueryParams((prev) => ({ ...prev, [key]: value, PageIndex: 1 }));
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((prev: any) => ({ ...prev, PageIndex: page, PageSize: pageSize }));
  };

  const columns = [
    {
      title: t('user_email'),
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number) => users[userId]?.email || 'hello@gmail.com',
      width: "300px"
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (action: number) => t(`action_${action}`), 
      width: "250px"

    },
    {
      title: t('text'),
      dataIndex: 'text',
      key: 'text',
      width: "140px"

    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ];

  return (
    <div style={{ paddingTop: "20px", }}>
      <div>
        <h1 style={{fontSize: "35px", fontWeight: "bold"}}>{t("user_logs")}</h1>
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', gap: '20px', paddingBottom: "20px"}}>
        <Select
          placeholder={t('select_email')}
          allowClear
          style={{ width: 200 }}
          onChange={(value) => handleFilterChange('UserId', value)}
        >
          {Object.values(users).map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.email}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder={t('select_action')}
          allowClear
          style={{ width: 200 }}
          onChange={(value) => handleFilterChange('Action', value)}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((action) => (
            <Select.Option key={action} value={action}>
              {t(`action_${action}`)}
            </Select.Option>
          ))}
        </Select>

        <DatePicker
          placeholder={t('start_date')}
          onChange={(date) => handleFilterChange('StartDate', date?.toISOString())}
        />

        <DatePicker
          placeholder={t('end_date')}
          onChange={(date) => handleFilterChange('EndDate', date?.toISOString())}
        />

        <Input
          placeholder={t('search_text')}
          style={{ width: 200 }}
          onPressEnter={(e) => handleFilterChange('Text', e.currentTarget.value)}
        />

        <Button onClick={() => setQueryParams({ PageIndex: 1, PageSize: 10 })}>
          {t('reset')}
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={logs}
        loading={isLogsLoading}
        pagination={false}
        rowKey="id"
      />

      {/* Pagination */}
      <Pagination
        total={logs.length}
        pageSize={queryParams.PageSize}
        onChange={handlePaginationChange}
        current={queryParams.PageIndex}
      />
    </div>
  );
}
