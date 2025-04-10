import React from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui'; 
import { RequestItems, RequestModel } from './type';
import { Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import styled from 'styled-components';

const StatusBadge = styled(Tag)`
  border-radius: 12px;
  padding: 4px 10px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;

const NotesText = styled.span`
  display: block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  pointer-events: auto; 
`;

interface props {
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

export function RequestList({ isRequestsLoading, requests, categories, setQueryParams, setDrawerStatus }: props) {
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
    // {
    //   title: t('processing_status'),
    //   dataIndex: 'processingStatus',
    //   key: 'processingStatus',
    // },
    {
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      width: 250,
      render: (text) => {
        const isLongText = text && text.length > 30; 
        return isLongText ? (
          <Tooltip
          title={text}
          placement="top"
          overlayStyle={{ maxWidth: '500px' }}
          overlayInnerStyle={{
            backgroundColor: 'rgba(15, 10, 10, 0.85)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '4px',
          }}
          mouseEnterDelay={0}  
          mouseLeaveDelay={-1}    
          trigger={['hover']}    
          destroyTooltipOnHide   
        >
          <NotesText>{text}</NotesText>
        </Tooltip>
        ) : (
          <NotesText>{text || '-'}</NotesText>
        );
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const status = record?.status?.toLowerCase();
        let color = '';
        let backgroundColor = '';

        switch (status) {
          case 'pending':
            color = '#d48806'; 
            backgroundColor = '#fff7e6'; 
            break;
          case 'inprogress':
            color = '#006644'; 
            backgroundColor = '#e6ffe6'; 
            break;
          case 'completed':
            color = '#006d75'; 
            backgroundColor = '#e6f7fa';
            break;
          case 'rejected':
            color = '#a8071a'; 
            backgroundColor = '#ffe6e6'; 
            break;
          default:
            color = '#000000'; 
            backgroundColor = '#ffffff'; 
        }

        return (
          <StatusBadge style={{ color, backgroundColor, border: 'none' }}>
            {t(status || 'unknown_status')}
          </StatusBadge>
        );
      },
    },
    {
      title: t('priority'),
      dataIndex: 'priority',
      key: 'priority',
      render: (_, record) =>
        PRIORITY?.map((item, index) => {
          if (item?.text?.toLowerCase() === record?.priority?.toLowerCase())
            return <React.Fragment key={index}>{t(item.text)}</React.Fragment>;
          return null;
        }),
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