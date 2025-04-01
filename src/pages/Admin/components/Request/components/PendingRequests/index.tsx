import React, { useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Table, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import { Tabs } from 'ui';
import { RequestFilter } from '../RequestFilter';
import { Notification } from 'ui';

interface QueryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
}

export function PendingRequests() {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<QueryParamsType>({ PageIndex: 1, PageSize: 10 });
  const [processingId, setProcessingId] = useState<number | null>(null);

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
      title: t('project_details'), 
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
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      filterSearch: true,
    },
    {
      title: t('deadline'),
      dataIndex: 'deadline',
      key: 'deadline',
      filterSearch: true,
      render: (_, record) => (record.deadline ? dayjs(record.deadline).diff(dayjs(record.createdAt), 'day') : null),
    },
    {
      title: t('Condition'),
      dataIndex: 'condition',
      key: 'condition',
      filterSearch: true,
      render: (_, record) => (
        <div>
          <Button 
            type="primary" 
            onClick={() => handleAccept(record)} 
            style={{ marginRight: 8, borderRadius: "10px" }}
            loading={processingId === record.id}
            disabled={processingId !== null || !record.id}
          >
            {t('accept')}
          </Button>
          <Button 
            type="default" 
            onClick={() => handleReject(record)} 
            style={{borderRadius: "10px"}} 
            danger
            loading={processingId === record.id}
            disabled={processingId !== null || !record.id}
          >
            {t('reject')}
          </Button>
        </div>
      ),
    },
  ];

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const { appendData: changeRequestStatus } = useQueryApiClient({
    request: {
      url: '/api/request/change-pending-request',
      method: 'PUT',
    },
    onSuccess() {
      Notification({ text: t('requestStatusUpdated'), type: 'success' });
    },
    onError() {
      Notification({ text: t('requestUpdateFailed'), type: 'error' });
    }
  });

  const handleAccept = async (record: RequestModel) => {
    if (!record?.id) {
      Notification({ text: t('invalidRequestId'), type: 'error' });
      return;
    }
    setProcessingId(record.id);
    try {
      const urlWithParams = `/api/request/change-pending-request?id=${record.id}&status=true`;
      await changeRequestStatus(null, null, { url: urlWithParams }); 
      getRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (record: RequestModel) => {
    if (!record?.id) {
      Notification({ text: t('invalidRequestId'), type: 'error' });
      return;
    }
    Modal.confirm({
      title: t('confirmReject'),
      content: t('areYouSureRejectRequest'),
      onOk: async () => {
        setProcessingId(record.id);
        try {
          const urlWithParams = `/api/request/change-pending-request?id=${record.id}&status=false`;
          await changeRequestStatus({ url: urlWithParams }); 
          getRequests();
        } catch (error) {
          console.error('Error rejecting request:', error);
        } finally {
          setProcessingId(null);
        }
      },
      okText: t('yes'),
      cancelText: t('no'),
      okButtonProps: {
        style: {
          background: '#ff4d4f', 
          borderColor: '#ff4d4f',
        },
        danger: true,
      },
      style: {
        color: 'white',
      },
    });
  };

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
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
    }));
  };

  useEffect(() => {
    postRequest(queryParams);
  }, [queryParams]);

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
        <h1 className="global-title">{t('pending_requests')}</h1>
      </div>
      <RequestFilter handleFilterChange={handleFilterChange} />
      <Tabs onChange={handleTabChange} type="card" items={items} className="admin-tabs deleted-request-tab" />
    </StyledRequestList>
  );
}