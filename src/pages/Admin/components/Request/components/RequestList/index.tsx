import React from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui';
import { RequestItems, RequestModel } from './type';

interface props {
  isRequestsLoading: boolean;
  requests: RequestItems;
  setQueryParams: any;
}

export function RequestList({ isRequestsLoading, requests, setQueryParams }: props) {
  const { t } = useTranslation();

  const handleFilter = (pagination: any, filters: any, sorter: any) => {
    setQueryParams((res: any) => ({ ...res, ...filters }));
  };

  const generateFilters = (field: keyof RequestModel) => {
    const uniqueValues = Array.from(new Set(requests?.items?.map((item) => item[field] ?? 'Unknown'))).filter(
      (value): value is string | number => value !== null && value !== undefined
    );

    if (uniqueValues.length === 0) {
      uniqueValues.push('Unknown');
    }

    return uniqueValues.map((value) => ({
      text: value === 'Unknown' ? t('unknown') : value,
      value: value,
    }));
  };

  const columns: ColumnsType<RequestModel> = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_, record, index) => <div>{(requests?.pageIndex - 1) * requests?.itemsPerPage + index + 1}</div>,
      fixed: 'left',
    },
    {
      title: t('createdAt'),
      dataIndex: 'date',
      key: 'date',
      filters: generateFilters('date'),
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('inquiry_type'),
      dataIndex: 'inquiryType',
      key: 'inquiryType',
      filters: generateFilters('inquiryType'),
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      filters: generateFilters('companyName'),
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
      filters: generateFilters('department'),
      filterSearch: true,
      fixed: 'left',
    },
    {
      title: t('responsible_person'),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      filters: generateFilters('responsiblePerson'),
      filterSearch: true,
    },
    {
      title: t('inquiry_field'),
      dataIndex: 'inquiryField',
      key: 'inquiryField',
      filters: generateFilters('inquiryField'),
      filterSearch: true,
    },
    {
      title: t('client_company'),
      dataIndex: 'clientCompany',
      key: 'clientCompany',
      filters: generateFilters('clientCompany'),
      filterSearch: true,
    },
    {
      title: t('ppoject_details'),
      dataIndex: 'projectDetails',
      key: 'projectDetails',
      filters: generateFilters('projectDetails'),
      filterSearch: true,
    },
    {
      title: t('client'),
      dataIndex: 'client',
      key: 'client',
      filters: generateFilters('client'),
      filterSearch: true,
    },
    {
      title: t('contact_number'),
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      filters: generateFilters('contactNumber'),
      filterSearch: true,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      filters: generateFilters('email'),
      filterSearch: true,
    },
    {
      title: t('processing_status'),
      dataIndex: 'processingStatus',
      key: 'processingStatus',
      filters: generateFilters('processingStatus'),
      filterSearch: true,
    },
    {
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
      filters: generateFilters('finalResult'),
      filterSearch: true,
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      filters: generateFilters('notes'),
      filterSearch: true,
    },
  ];

  const items = [
    {
      label: t('all'),
      key: 'Null',
      children: (
        <Table
          columns={columns}
          loading={isRequestsLoading}
          dataSource={requests?.items || []}
          onChange={handleFilter}
          scroll={{ x: 'max-content' }}
          pagination={false}
          showSorterTooltip={false}
        />
      ),
    },
    {
      label: t('for_wisestone'),
      key: '4',
      children: (
        <Table
          columns={columns}
          loading={isRequestsLoading}
          dataSource={requests?.items || []}
          onChange={handleFilter}
          scroll={{ x: 'max-content' }}
          pagination={false}
          showSorterTooltip={false}
          tableLayout="fixed"
        />
      ),
    },
    {
      label: t('for_ict'),
      key: '1',
      children: (
        <Table
          columns={columns}
          loading={isRequestsLoading}
          dataSource={requests?.items || []}
          onChange={handleFilter}
          pagination={false}
          showSorterTooltip={false}
          scroll={{ x: 'max-content' }}
        />
      ),
    },
    {
      label: t('for_test'),
      key: '2',
      children: (
        <Table
          columns={columns}
          loading={isRequestsLoading}
          dataSource={requests?.items || []}
          onChange={handleFilter}
          pagination={false}
          showSorterTooltip={false}
          scroll={{ x: 'max-content' }}
        />
      ),
    },
    {
      label: t('for_marketing'),
      key: '3',
      children: (
        <Table
          columns={columns}
          loading={isRequestsLoading}
          dataSource={requests?.items || []}
          onChange={handleFilter}
          pagination={false}
          showSorterTooltip={false}
          scroll={{ x: 'max-content' }}
        />
      ),
    },
  ];

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
    <StyledRequestList>
      <Tabs onChange={handleTabChange} type="card" items={items} className="admin-tabs" />
    </StyledRequestList>
  );
}
