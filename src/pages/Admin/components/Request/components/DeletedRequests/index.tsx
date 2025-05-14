import React, { useCallback, useEffect, useState } from 'react';
import { StyledRequestList } from '../RequestList/style';
import { Button, Table, Checkbox, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestFilter } from '../RequestFilter';
import Tooltip from 'antd/lib/tooltip';
import { smoothScroll, syncPaginationAfterDelete } from 'utils/globalFunctions';
import Pagination from 'ui/Pagination/Pagination';
import { ConfirmModal, Notification } from 'ui';
import { TFunction } from 'i18next';
import { useSearchParams } from 'react-router-dom';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  Category?: string;
  IsDeleted: 1;
  Text?: string;
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
    Category: searchParams.get('Category') ?? undefined,
    Text: searchParams.get('Text') ?? undefined,
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
      width: 130,
      render: (text) => (
        <div
          style={{
            width: '130px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </div>
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
      width: 120,
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
  ];

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

  const { refetch: handleDelete } = useQueryApiClient({
    request: {
      url: '/api/request/delete-deleted-request',
      method: 'DELETE',
      data: selectedIds,
    },
    onSuccess: () => {
      Notification({ type: 'delete', text: t('request_deleted') });
      syncPaginationAfterDelete({
        totalItems: requests?.data?.totalItems ?? 0,
        itemsPerPage: requests?.data?.itemsPerPage ?? 10,
        currentPageIndex: queryparams.PageIndex,
        deletedCount: selectedIds.length,
        setSearchParams,
        setQueryParams,
        pageSize: queryparams.PageSize,
      });
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
      syncPaginationAfterDelete({
        totalItems: requests?.data?.totalItems ?? 0,
        itemsPerPage: requests?.data?.itemsPerPage ?? 10,
        currentPageIndex: queryparams.PageIndex,
        deletedCount: selectedIds.length,
        setSearchParams,
        setQueryParams,
        pageSize: queryparams.PageSize,
      });
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
    setQueryParams((res) => ({ ...res, Category: undefined, Text: undefined }));
    searchParams.delete('Category');
    searchParams.delete('Text');
    setSearchParams(searchParams);
  };

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
