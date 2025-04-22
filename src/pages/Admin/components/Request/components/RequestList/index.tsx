import React from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';

import { PROJECT_STATUS } from 'utils/consts';
import { RequestItems, RequestModel } from './type';

interface Props {
  isRequestsLoading: boolean;
  requests: RequestItems;
  setQueryParams: any;
  categories: { id: number; title: string }[];
  setDrawerStatus: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      type: 'VIEW' | 'EDIT' | 'ADD';
      request?: RequestModel;
      sequence?: number;
    }>
  >;
}

export function RequestList({ isRequestsLoading, requests, categories, setQueryParams, setDrawerStatus }: Props) {
  const { t } = useTranslation();

  const handleFilter = (pagination: any, filters: any, sorter: any) => {
    setQueryParams((res: any) => ({ ...res, ...filters }));
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
      fixed: 'left',
      render: (date: string) => {
        if (!date) return '-';
        const parsedDate = dayjs(date, 'DD/MM/YYYY');
        return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : date;
      },
    },
    {
      title: t('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      fixed: 'left',
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
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      width: 120,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) =>
        PROJECT_STATUS?.map((item, index) => {
          if (item?.text?.toLowerCase() === record?.status?.toLowerCase())
            return <React.Fragment key={index}>{t(item.text)}</React.Fragment>;
          return null;
        }),
    },
    {
      title: t('action'),
      dataIndex: 'action',
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
        onRow={(record, row) => ({
          onClick: () => {
            setDrawerStatus({
              request: record,
              status: true,
              type: 'VIEW',
              sequence: row != undefined ? row + 1 : 0,
            });
          },
        })}
      />
    </StyledRequestList>
  );
}
