import React, { useMemo, useCallback } from 'react';
import { StyledRequestList } from './style';
import Table, { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button, Popover, Checkbox, Tooltip } from 'antd';
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

  const handleFilter = useCallback(
    (pagination: any, filters: any, sorter: any) => {
      setQueryParams((prev: any) => ({ ...prev, ...filters }));
    },
    [setQueryParams]
  );

  const handleCheckboxChange = useCallback(
    (recordId: number) => {
      setSelectedIds(
        selectedIds.includes(recordId) ? selectedIds.filter((id) => id !== recordId) : [...selectedIds, recordId]
      );
    },
    [selectedIds, setSelectedIds]
  );

  const handleSelectAllChange = useCallback(
    (e: any) => {
      if (e.target.checked) {
        const allIds = requests?.items?.map((item) => item.id).filter((id): id is number => !!id) || [];
        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }
    },
    [requests?.items, setSelectedIds]
  );

  const columns = useMemo<ColumnsType<RequestModel>>(
    () => [
      {
        title: (
          <Checkbox
            checked={requests?.items?.length > 0 && selectedIds.length === requests.items.length}
            indeterminate={selectedIds.length > 0 && selectedIds.length < (requests?.items?.length || 0)}
            onChange={handleSelectAllChange}
          />
        ),
        key: 'checkbox',
        fixed: 'left',
        width: 50,
        render: (_, record) =>
          record.id ? (
            <Checkbox checked={selectedIds.includes(record.id)} onChange={() => handleCheckboxChange(record.id)} />
          ) : null,
      },
      {
        title: t('createdAt'),
        dataIndex: 'date',
        key: 'date',
        fixed: 'left',
        width: '100px',
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
        width: 130,
        render: (text) => (
          <Popover
            content={
              <div
                style={{
                  padding: '12px 16px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  width: '200px',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  borderRadius: '8px',
                }}
              >
                {text?.trim() || <span style={{ color: '#999' }}>{t('no_notes')}</span>}
              </div>
            }
            overlayStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            }}
            overlayInnerStyle={{
              padding: 0,
            }}
          >
            <div 
              style={{
                width: '130px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              {text}
            </div>
          </Popover>
        ),
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
                textAlign: 'center',
                borderRadius: '8px',
                padding: '4px 8px',
                backgroundColor: hexToRgba(status.color, 0.2),
                display: 'inline-block',
                width: '120px',
                maxWidth: '120px',
                minWidth: '120px',
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
              style={{
                fontSize: '16px',
                textAlign: 'center',
              }}
            >
              {t(record?.processingStatus?.text)}
            </span>
          ) : null;
        },
      },
    ],
    [t, selectedIds, handleCheckboxChange, navigate, requests?.items, handleSelectAllChange]
  );

  function hexToRgba(hex: string, alpha: number = 1): string {
    let r: number = 0,
      g: number = 0,
      b: number = 0;

    hex = hex.replace('#', '');

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

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
        rowKey="id"
        onRow={(record) => ({
          onClick: (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) return;
            navigate(`/request-detail/${record.id}`);
          },
          style: { cursor: 'pointer' },
        })}
      />
    </StyledRequestList>
  );
}
