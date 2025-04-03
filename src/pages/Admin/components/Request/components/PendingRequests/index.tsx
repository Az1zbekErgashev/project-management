import React, { useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { Button, ConfirmModal } from 'ui';
import { RequestFilter } from '../RequestFilter';
import { Notification } from 'ui';
import { TFunction } from 'i18next';

interface QueryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
}

const createModalConfig = (t: TFunction, type: 'DELETE' | 'ACCEPT', onConfirm: () => void, onCancel: () => void) => ({
  type,
  cancelText: t('cancel'),
  confirmText: t(type === 'DELETE' ? 'reject_request' : 'accept_request'),
  title: t(type === 'DELETE' ? 'reject_request_title' : 'accept_request_title'),
  content: t(type === 'DELETE' ? 'reject_request_description' : 'accept_request_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function PendingRequests() {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<QueryParamsType>({ PageIndex: 1, PageSize: 10 });
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [requestId, setRequestId] = useState<{ id: number; status: boolean } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
    },
    {
      title: t('client_company'),
      dataIndex: 'clientCompany',
      key: 'clientCompany',
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
      title: t('inquiry_source'),
      dataIndex: 'inquirySource',
      key: 'inquirySource',
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
      title: t('project_budget'),
      dataIndex: 'projectBudget',
      key: 'projectBudget',
      filterSearch: true,
    },
    {
      title: t('additional_information'),
      dataIndex: 'additionalInformation',
      key: 'additionalInformation',
      filterSearch: true,
    },
    {
      title: t('deadline'),
      dataIndex: 'deadline',
      key: 'deadline',
      filterSearch: true,
      render: (_, record) => {
        const remainingDays = record.deadline ? dayjs(record.deadline).diff(dayjs(), 'day') : null;
        if (remainingDays === null) return null;
        if (remainingDays <= 0) return t('overdue');
        return remainingDays === 1 ? '1' : `${remainingDays} дня${remainingDays > 1 ? '' : ''}`;
      },
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: t('condition'),
      dataIndex: 'condition',
      key: 'condition',
      filterSearch: true,
      render: (_, record) => {
        const remainingDays = record?.deadline ? dayjs(record?.deadline).diff(dayjs(), 'day') : null;
        return (
          <div>
            {remainingDays && remainingDays > 0 && (
              <Button onClick={() => handleConfirm('ACCEPT', record.id, true)} label={t('accept')} type="primary" />
            )}
               
            <Button
              onClick={() => handleConfirm('DELETE', record.id, false)}
              label={t('reject')}
              type="default"
              danger
            />
          </div>
        );
      },
    },
  ];

  const handleConfirm = (type: 'DELETE' | 'ACCEPT', id: number, status: boolean) => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          setRequestId({ id: id, status: status });
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const handleFilterVisible = () => {
    setIsVisible(prev => !prev);
  }

  const { refetch: changeRequestStatus } = useQueryApiClient({
    request: {
      url: `/api/request/change-pending-request?id=${requestId?.id}&status=${requestId?.status}`,
      method: 'PUT',
    },
    onSuccess() {
      Notification({ text: t('requestStatusUpdated'), type: 'success' });
      setRequestId(null);
      setConiformModal(null);
      getRequests();
      getFilteredValue();
    },
    onError() {
      Notification({ text: t('requestUpdateFailed'), type: 'error' });
      setRequestId(null);
      setConiformModal(null);
    },
  });

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
    refetch: getRequests,
  } = useQueryApiClient({
    request: {
      url: '/api/request/pending-requets',
      method: 'GET',
      data: queryParams,
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
    postRequest(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (requestId) {
      changeRequestStatus();
    }
  }, [requestId]);

  const { data: filterValue, refetch: getFilteredValue } = useQueryApiClient({
    request: {
      url: '/api/request/filter-values',
      method: 'GET',
      data: {
        isDeleted: window.location.pathname.includes('deleted-request') ? 1 : 0,
        status: window.location.pathname.includes('pending-request') ? 0 : null,
      },
    },
  });

  return (
    <StyledRequestList className="deleted-requests">
      <div className="header-line">
        <h1 className="global-title">{t('pending_requests')}</h1>
        <Button
          className='filter-btn'
          type="primary"
          onClick={handleFilterVisible}
          label={isVisible ? t('hide_filter') : t('show_filter')}
        />
      </div>
      {isVisible && <RequestFilter filterValue={filterValue} handleFilterChange={handleFilterChange} />}
      <Table
        columns={columns}
        dataSource={requests?.data?.items || []}
        onChange={handleFilter}
        scroll={{ x: 'max-content' }}
        pagination={false}
        showSorterTooltip={false}
        loading={isRequestsLoading}
      />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledRequestList>
  );
}