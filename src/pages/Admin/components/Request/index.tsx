import React, { useEffect, useState, useCallback } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { Button, Spinner, Modal, Notification, ConfirmModal } from 'ui';
import { DeleteOutlined } from '@ant-design/icons';
import { StyledRequests } from './style';
import axios from 'axios';
import { routes } from 'config/config';
import { RequestFilter } from './components/RequestFilter';
import UploadModal from './components/Upload/upload';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useJwt from 'utils/useJwt';
import { useLanguage } from 'contexts/LanguageContext';
import { TFunction } from 'i18next';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  Text?: string[];
  Category?: string;
  RequestTitle?: string;
}

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_requests_title'),
  content: t('delete_requests_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Request() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [queryparams, setQueryParams] = useState<queryParamsType>({
    PageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    PageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [filetState, setFileState] = useState<{ name: string; file: File } | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionModal, setActionModal] = useState<any>();
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);
  const { getHeader } = useJwt();
  const { language } = useLanguage();
  const getToken = getHeader();

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
    refetch: getRequests,
  } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      disableOnMount: true,
    },
  });

  const { refetch: handleDelete } = useQueryApiClient({
    request: {
      url: '/api/request/soft-delete-open-request',
      method: 'DELETE',
      data: selectedIds,
    },
    onSuccess: () => {
      Notification({ type: 'info', text: t('request_deleted') });
      setQueryParams((res) => ({ ...res }));
      setSelectedIds([]);
      setActionModal(null);
    },
    onError: () => {
      Notification({ type: 'error', text: t('failed_to_delete_requests') });
    },
  });

  const handleDeleteSelected = useCallback(async () => {
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
          }
        )
      );
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  }, [selectedIds, handleDelete]);

  const resetFileds = () => {
    setQueryParams((res) => ({ ...res, RequestTitle: undefined, Category: undefined, Text: undefined }));
  };

  const handlePaginationChange = useCallback((page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((prev) => ({ ...prev, PageIndex: page, PageSize: pageSize }));
  }, []);

  const handleFilterChange = useCallback((changedValue: Partial<queryParamsType>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...changedValue,
    }));
  }, []);

  useEffect(() => {
    postRequest({ ...queryparams });
  }, [queryparams]);

  const handleDownload = useCallback(async () => {
    setIsFileLoading(true);
    try {
      const response = await axios.get(`${routes.api.baseUrl}/api/request/export-excel?languageId=${language}`, {
        params: { requestCategoryId: queryparams.Category },
        responseType: 'blob',
        headers: {
          Authorization: getToken,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${queryparams.RequestTitle ?? 'All'}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setIsFileLoading(false);
    }
  }, [queryparams, language, getToken, t]);

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  return (
    <StyledRequests>
      {isFileLoading ? (
        <div className="spinnig-wrrap">
          <Spinner spinning={true} />
        </div>
      ) : (
        <React.Fragment>
          <div className="header-line">
            <h1 className="global-title">{t('manage_requests')}</h1>
            <div className="upload-download">
              {selectedIds.length > 0 && (
                <Button
                  label={t('delete')}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteSelected}
                  loading={isDeleting}
                  disabled={isDeleting}
                  danger
                />
              )}
              <Button label={t('upload')} type="primary" onClick={() => setShowUpload(true)} />
              <Modal
                footer={null}
                open={showUpload}
                width={400}
                onCancel={() => {
                  setFileState(null);
                  setShowUpload(false);
                }}
              >
                <UploadModal
                  getRequests={getRequests}
                  setFileState={setFileState}
                  filetState={filetState}
                  onClose={() => setShowUpload(false)}
                />
              </Modal>
              <Button className="down-upload" label={t('download')} type="primary" onClick={handleDownload} />
              <Button
                className="down-upload"
                label={t('add_new_request')}
                type="primary"
                onClick={() => navigate('/add-requests')}
              />
            </div>
          </div>
          <RequestFilter
            resetFileds={resetFileds}
            categories={categories}
            handleFilterChange={handleFilterChange}
            isDeleted={0}
          />
          <RequestList
            setQueryParams={setQueryParams}
            requests={requests?.data || { items: [], totalItems: 0, itemsPerPage: 10, PageIndex: 1 }}
            isRequestsLoading={isRequestsLoading}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
          />
          <Pagination
            total={requests?.data?.totalItems ?? 0}
            pageSize={requests?.data?.itemsPerPage ?? 10}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={requests?.data?.PageIndex ?? 1}
          />
        </React.Fragment>
      )}

      {actionModal && <ConfirmModal {...actionModal} />}
    </StyledRequests>
  );
}
