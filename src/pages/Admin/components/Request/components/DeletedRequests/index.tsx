import React, { useCallback, useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Button, Table, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestFilter } from '../RequestFilter';
import Tooltip from 'antd/lib/tooltip';
import { smoothScroll } from 'utils/globalFunctions';
import Pagination from 'ui/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ConfirmModal, Notification } from 'ui';
import { TFunction } from 'i18next';
import { usePaginationAutoCorrect } from 'hooks/usePaginationAutoCorrect';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
  IsDeleted: 1;
}

const createModalConfig = (
  t: TFunction,
  onConfirm: () => void,
  onCancel: () => void,
  type: string,
  titleText: string,
  desctiption: string
) => ({
  cancelText: t('cancel'),
  confirmText: t(type),
  title: t(titleText),
  content: t(desctiption),
  open: true,
  onConfirm,
  onCancel,
});

export function DeletedRequests() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [queryparams, setQueryParams] = useState<queryParamsType>({
    PageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    PageSize: parseInt(searchParams.get('pageSize') ?? '10'),
    IsDeleted: 1,
  });
  const [actionModal, setActionModal] = useState<any>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: getRequests,
  } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      data: queryparams,
      disableOnMount: true,
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = requests?.data?.items.map((record: RequestModel) => record.id) || [];
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleFilter = (pagination: any, filters: any, sorter: any) => {
    setQueryParams((res: any) => ({ ...res, ...filters }));
  };

  const columns: ColumnsType<RequestModel> = [
    {
      title: (
        <Checkbox
          checked={selectedIds.length > 0 && selectedIds.length === requests?.data?.items.length}
          indeterminate={selectedIds.length > 0 && selectedIds.length < requests?.data?.items.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      key: 'checkbox',
      fixed: 'left',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedIds((prev) => (checked ? [...prev, record.id] : prev.filter((id) => id !== record.id)));
          }}
        />
      ),
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
  ];

  const { refetch: handleDelete } = useQueryApiClient({
    request: {
      url: '/api/request/delete-deleted-request',
      method: 'DELETE',
      data: selectedIds,
    },
    onSuccess: () => {
      Notification({ type: 'delete', text: t('request_deleted') });
      setQueryParams((res) => ({ ...res }));
      setSelectedIds([]);
      setActionModal(null);
    },
    onError: () => {
      Notification({ type: 'error', text: t('failed_to_delete_requests') });
    },
  });

  const { refetch: handleRecover } = useQueryApiClient({
    request: {
      url: '/api/request/soft-recover-open-request',
      method: 'DELETE',
      data: selectedIds,
    },
    onSuccess: () => {
      Notification({ type: 'success', text: t('request_recovered') });
      setQueryParams((res) => ({ ...res }));
      setSelectedIds([]);
      setActionModal(null);
    },
    onError: () => {
      Notification({ type: 'error', text: t('failed_to_delete_requests') });
    },
  });

  const handleRecoverSelected = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      setActionModal(
        createModalConfig(
          t,
          () => {
            handleRecover();
          },
          () => {
            setActionModal(null);
          },
          'recover',
          'recover_request_title',
          'recover_request_description'
        )
      );
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedIds, handleRecover]);

  const handleHardDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      setActionModal(
        createModalConfig(
          t,
          () => {
            handleDelete();
          },
          () => {
            setActionModal(null);
          },
          'delete',
          'delete_request_title',
          'delete_request_description'
        )
      );
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedIds, handleDelete]);

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
    }));
  };

  useEffect(() => {
    getRequests(queryparams);
  }, [queryparams]);

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  const resetFileds = () => {
    setQueryParams((res) => ({ ...res, requestTitle: undefined, category: undefined, text: undefined }));
  };

  usePaginationAutoCorrect(requests?.data, setQueryParams, setSearchParams);

  return (
    <StyledRequestList className="deleted-requests">
      <div className="header-line">
        <h1 className="global-title">{t('deleted_requests')}</h1>
        <div className="header-actions">
          {selectedIds.length > 0 && (
            <Button
              type="primary"
              danger
              onClick={() => handleRecoverSelected()}
              loading={isDeleting}
              style={{ marginLeft: 'auto' }}
            >
              {t('recover_selected_requests')}
            </Button>
          )}
          {selectedIds.length > 0 && (
            <Button
              type="primary"
              danger
              onClick={() => handleHardDelete()}
              loading={isDeleting}
              style={{ marginLeft: 'auto' }}
            >
              {t('delete_selected')}
            </Button>
          )}
        </div>
      </div>
      <RequestFilter
        resetFileds={resetFileds}
        categories={categories}
        handleFilterChange={handleFilterChange}
        isDeleted={1}
      />
      <Table
        columns={columns}
        dataSource={requests?.data?.items || []}
        onChange={handleFilter}
        scroll={{ x: 'max-content' }}
        pagination={false}
        showSorterTooltip={false}
        loading={isRequestsLoading}
      />
      <Pagination
        total={requests?.data?.totalItems}
        pageSize={requests?.data?.itemsPerPage}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
        current={requests?.data?.pageIndex}
      />
      {actionModal && <ConfirmModal {...actionModal} />}
    </StyledRequestList>
  );
}
