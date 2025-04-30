import React from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Tooltip from 'antd/lib/tooltip';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestItems, RequestModel } from './type';
import { useNavigate } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  isRequestsLoading: boolean;
  requests: RequestItems;
  setQueryParams: any;
  categories: { id: number; title: string }[];
}

export function RequestList({ isRequestsLoading, requests, categories, setQueryParams }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFilter = (pagination: any, filters: any, sorter: any) => {
    setQueryParams((res: any) => ({ ...res, ...filters }));
  };

  const columns: ColumnsType<RequestModel> = [
    {
      title: t('createdAt'),
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      render: (date: string) => {
        if (!date) return '-';
        return dayjs(date).format('YYYY-MM-DD');
      },
    },
    {
      title: t('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      fixed: 'left',
      render: (updatedAt: string) => {
        if (!updatedAt) return '-';
        return dayjs.utc(updatedAt).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: t('inquiry_type'),
      dataIndex: 'inquiryType',
      key: 'inquiryType',
      fixed: 'left',
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      fixed: 'left',
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
      fixed: 'left',
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
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      width: 120,
      render: (notes: string) => (
        <Tooltip
          title={notes || t('no_notes')}
          placement="top"
          mouseLeaveDelay={0.1}
          destroyTooltipOnHide={{ keepParent: false }}
          overlayStyle={{
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '4px',
            padding: '8px',
            width: 'auto',
            maxWidth: '200px',
          }}
        >
          <Button type="primary" size="small" style={{ padding: '15px', borderRadius: '12px', fontSize: '12px' }}>
            {t('view_notes')}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: (_, record) => {
        const status = PROJECT_STATUS.find((item) => item?.text?.toLowerCase() === record?.status?.toLowerCase());
        return status ? (
          <span
            key={status.id}
            style={{
              color: status.color,
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {t(status.text)}
          </span>
        ) : null;
      },
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, record, index) => (
        <Button
          style={{ fontSize: '12x', padding: '8px', borderRadius: '12px' }}
          type="primary"
          onClick={() => {
            navigate(`/request-detail/${record.id}`);
          }}
        >
          {t('view_details')}
        </Button>
      ),
    },
  ];

  return (
    <StyledRequestList>
      <Table
        columns={columns}
        loading={isRequestsLoading}
        dataSource={requests?.items || []}
        onChange={handleFilter}
        scroll={{ x: 'max-content' }}
        pagination={false}
        showSorterTooltip={false}
      />
    </StyledRequestList>
  );
}
