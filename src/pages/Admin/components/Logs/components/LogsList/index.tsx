import React from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Table } from 'ui';
import { actions } from 'utils/consts';

interface props {
  logs: any;
}
export function LogsList({ logs }: props) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('ip'),
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: t('user_email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: t('date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <div>{t(action)}</div>,
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={logs?.data?.items} />
    </div>
  );
}
