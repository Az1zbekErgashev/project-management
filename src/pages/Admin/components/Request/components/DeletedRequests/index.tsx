import React, { useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Button, Drawer, Form, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestFilter } from '../RequestFilter';
import Tooltip from 'antd/lib/tooltip';
interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
  IsDeleted: 1;
}

export function DeletedRequests() {
  const { t } = useTranslation();
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10, IsDeleted: 1 });

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
  ];

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
  } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      data: queryparams,
      disableOnMount: true,
    },
  });

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
    }));
  };

  useEffect(() => {
    postRequest(queryparams);
  }, [queryparams]);

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  return (
    <StyledRequestList className="deleted-requests">
      <div className="header-line">
        <h1 className="global-title">{t('deleted_requests')}</h1>
      </div>
      <RequestFilter categories={categories} handleFilterChange={handleFilterChange} isDeleted={1} />
      <Table
        columns={columns}
        dataSource={requests?.data?.items || []}
        onChange={handleFilter}
        scroll={{ x: 'max-content' }}
        pagination={false}
        showSorterTooltip={false}
        loading={isRequestsLoading}
      />
    </StyledRequestList>
  );
}
