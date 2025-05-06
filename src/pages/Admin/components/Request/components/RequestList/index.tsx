import React, { useMemo, useCallback } from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button, Popover, Checkbox } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestItems, RequestModel } from './type';
import { useNavigate } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  isRequestsLoading: boolean;
  requests: RequestItems;
  setQueryParams: (params: any) => void;
  setSelectedIds: (ids: number[]) => void;
  selectedIds: number[];
}

export function RequestList({ isRequestsLoading, requests, setQueryParams, setSelectedIds, selectedIds }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFilter = useCallback((pagination: any, filters: any, sorter: any) => {
    setQueryParams((prev: any) => ({ ...prev, ...filters }));
  }, [setQueryParams]);

  const handleCheckboxChange = useCallback(
    (recordId: number) => {
      setSelectedIds(
        selectedIds.includes(recordId)
          ? selectedIds.filter((id) => id !== recordId)
          : [...selectedIds, recordId]
      );
    },
    [selectedIds, setSelectedIds]
  );

  const columns = useMemo<ColumnsType<RequestModel>>(
    () => [
      {
        title: '',
        key: 'checkbox',
        fixed: 'left',
        width: 50,
        render: (_, record) =>
          record.id ? (
            <Checkbox
              checked={selectedIds.includes(record.id)}
              onChange={() => handleCheckboxChange(record.id)}
            />
          ) : null,
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
      {
        title: t('notes'),
        dataIndex: 'notes',
        key: 'notes',
        width: 120,
        render: (notes: string) => (
          <Popover
            content={
              <div
                style={{
                  padding: '12px 16px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  width: '250px',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  borderRadius: '8px',
                }}
              >
                {notes?.trim() || <span style={{ color: '#999' }}>{t('no_notes')}</span>}
              </div>
            }
            trigger="click"
            overlayStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            }}
            overlayInnerStyle={{
              padding: 0,
            }}
          >
            <Button
              type="primary"
              size="small"
              style={{
                padding: '15px',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {t('view_notes')}
            </Button>
          </Popover>
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
                fontSize: '16px',
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              {t(status.text)}
            </span>
          ) : null;
        },
      },
      {
        title: t('processing_status'),
        dataIndex: ['processingStatus', 'text'],
        key: 'processingStatus',
        width: '200px',
        render: (_, record) => {
          return record?.processingStatus ? (
            <span
              style={{ color: record.processingStatus?.color, fontSize: '16px', fontWeight: '800', textAlign: 'center' }}
            >
              {t(record?.processingStatus?.text)}
            </span>
          ) : null;
        },
      },
      {
        title: t('action'),
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
          <Button
            style={{ fontSize: '12px', padding: '8px', borderRadius: '12px' }}
            type="primary"
            onClick={() => {
              navigate(`/request-detail/${record.id}`);
            }}
          >
            {t('view_details')}
          </Button>
        ),
      },
    ],
    [t, selectedIds, handleCheckboxChange, navigate]
  );

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