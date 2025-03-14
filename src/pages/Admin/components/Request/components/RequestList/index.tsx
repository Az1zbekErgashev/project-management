import React from 'react';
import { StyledRequestList } from './style';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Table } from 'ui';
import { RequestModel } from './type';
import Pagination from 'ui/Pagination/Pagination';
import dayjs from 'dayjs';

interface props {
  isRequestsLoading: boolean;
  requests: RequestModel[];
}

export function RequestList({ isRequestsLoading, requests }: props) {
  const { t } = useTranslation();

  const columns: ColumnsType<any> = [
    {
      title: t('sequencce'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (item, record) => (item ? dayjs(item).format('YYYY-MM-DD') : null),
    },
    {
      title: t('inquiry_type'),
      dataIndex: 'inquiryType',
      key: 'inquiryType',
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: t('responsible_person'),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
    },
    {
      title: t('inquiry_field'),
      dataIndex: 'inquiryField',
      key: 'inquiryField',
    },
    {
      title: t('client_company'),
      dataIndex: 'clientCompany',
      key: 'clientCompany',
    },
    {
      title: t('ppoject_details'),
      dataIndex: 'projectDetails',
      key: 'projectDetails',
    },
    {
      title: t('client'),
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: t('contact_number'),
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('processing_status'),
      dataIndex: 'processingStatus',
      key: 'processingStatus',
    },
    {
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
    },
  ];
  return (
    <StyledRequestList>
      <Table columns={columns} loading={isRequestsLoading} dataSource={requests} />
    </StyledRequestList>
  );
}
