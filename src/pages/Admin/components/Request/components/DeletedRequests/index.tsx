import React, { useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import { Tabs } from 'ui';
import { RequestFilter } from '../RequestFilter';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
}

export function DeletedRequests() {
  const { t } = useTranslation();
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10 });
  const handleFilter = (pagination: any, filters: any, sorter: any) => {
    setQueryParams((res: any) => ({ ...res, ...filters }));
  };

  const columns: ColumnsType<RequestModel> = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_, record, index) => (
        <div>{(requests?.data?.pageIndex - 1) * requests?.data?.itemsPerPage + index + 1}</div>
      ),
      fixed: 'left',
    },
    {
      title: t('createdAt'),
      dataIndex: 'date',
      key: 'date',
      filterSearch: true,
      fixed: 'left',
      render: (_, record) => (record.date ? dayjs(record.date).format('DD.MM.YYYY') : null),
    },
    {
      title: t('inquiry_type'),
      dataIndex: 'inquiryType',
      key: 'inquiryType',
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('responsible_person'),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      filterSearch: true,
    },
    {
      title: t('inquiry_field'),
      dataIndex: 'inquiryField',
      key: 'inquiryField',
      filterSearch: true,
    },
    {
      title: t('client_company'),
      dataIndex: 'clientCompany',
      key: 'clientCompany',
      filterSearch: true,
    },
    {
      title: t('ppoject_details'),
      dataIndex: 'projectDetails',
      key: 'projectDetails',
      filterSearch: true,
    },
    {
      title: t('client'),
      dataIndex: 'client',
      key: 'client',
      filterSearch: true,
    },
    {
      title: t('contact_number'),
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      filterSearch: true,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      filterSearch: true,
    },
    {
      title: t('processing_status'),
      dataIndex: 'processingStatus',
      key: 'processingStatus',
      filterSearch: true,
    },
    {
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
      filterSearch: true,
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      filterSearch: true,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      filterSearch: true,
      render: (_, record) =>
        PROJECT_STATUS?.map((item, index) => {
          if (item.text.toLowerCase() === record?.status?.toLowerCase())
            return <React.Fragment key={index}>{t(item.text)}</React.Fragment>;
          return null;
        }),
    },
    {
      title: t('priority'),
      dataIndex: 'priority',
      key: 'priority',
      filterSearch: true,
      render: (_, record) =>
        PRIORITY?.map((item, index) => {
          if (item.text.toLowerCase() === record?.priority?.toLowerCase())
            return <React.Fragment key={index}>{t(item.text)}</React.Fragment>;
          return null;
        }),
    },
    {
      title: t('deadline'),
      dataIndex: 'deadline',
      key: 'deadline',
      filterSearch: true,
      render: (_, record) => (record.deadline ? dayjs(record.deadline).diff(dayjs(record.createdAt), 'day') : null),
    },
  ];

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
    refetch: getRequests,
  } = useQueryApiClient({
    request: {
      url: '/api/request/deleted-requets',
      method: 'GET',
      data: queryparams,
      disableOnMount: true,
    },
  });

  const items = [
    {
      label: t('all'),
      key: 'Null',
      children: (
        <Table
          columns={columns}
          dataSource={requests?.data?.items || []}
          onChange={handleFilter}
          scroll={{ x: 'max-content' }}
          pagination={false}
          showSorterTooltip={false}
          loading={isRequestsLoading}
        />
      ),
    },
    ...(categories?.data?.map((category: any) => ({
      label: t(category.title),
      key: category.id.toString(),
      children: (
        <Table
          columns={columns}
          dataSource={requests?.data?.items || []}
          onChange={handleFilter}
          scroll={{ x: 'max-content' }}
          pagination={false}
          showSorterTooltip={false}
          loading={isRequestsLoading}
        />
      ),
    })) || []),
  ];

  const handleFilterChange = (changedValue: any) => {

    console.log(changedValue);
    
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
    }));
  };

  useEffect(() => {
    postRequest(queryparams);
  }, [queryparams]);

  const handleTabChange = (key: string) => {
    const selectedTab = items.find((item) => item.key === key);
    const label = selectedTab ? selectedTab.label : '';

    if (key === 'Null')
      setQueryParams((res: any) => ({
        ...res,
        PageIndex: 1,
        PageSize: 10,
        RequestStatusId: null,
        RequestTitle: undefined,
      }));
    else
      setQueryParams((res: any) => ({
        ...res,
        PageIndex: 1,
        PageSize: 10,
        RequestStatusId: parseInt(key),
        RequestTitle: label,
      }));
  };

  return (
    <StyledRequestList className="deleted-requests">
      <div className="header-line">
        <h1 className="global-title">{t('deleted_requests')}</h1>
      </div>
      <RequestFilter handleFilterChange={handleFilterChange} />
      <Tabs onChange={handleTabChange} type="card" items={items} className="admin-tabs  deleted-request-tab" />
    </StyledRequestList>
  );
}
