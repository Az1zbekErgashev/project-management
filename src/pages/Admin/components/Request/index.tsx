import React, { useEffect, useState } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { Button, ConfirmModal, Spinner, Notification } from 'ui';
import { StyledRequests } from './style';
import axios from 'axios';
import { routes } from 'config/config';
import { Drawer, Form } from 'antd';
import { InputSelection } from './components/InputSelection';
import { RequestModel } from './components/RequestList/type';
import { TFunction } from 'i18next';
import { RequestFilter } from './components/RequestFilter';
import dayjs from 'dayjs';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  Text?: string[];
  Category?: string;
  RequestTitle?: string;
}

const createModalConfig = (
  t: TFunction,
  isDelete: 'DELETE' | 'RECOVER',
  onConfirm: () => void,
  onCancel: () => void
) => ({
  isDelete,
  cancelText: t('cancel'),
  confirmText: t(isDelete === 'DELETE' ? 'delete_request' : 'recover_request'),
  title: t(isDelete === 'DELETE' ? 'delete_request_title' : 'recover_request_title'),
  content: t(isDelete === 'DELETE' ? 'delete_request_description' : 'recover_request_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Request() {
  const { t } = useTranslation();
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10 });
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [requestId, setRequestId] = useState<{ type: 'DELETE' | 'RECOVER'; id: number } | null>(null);
  const [drawerStatus, setDrawerStatus] = useState<{
    status: boolean;
    type: 'VIEW' | 'EDIT' | 'ADD';
    request?: RequestModel;
    sequence?: number;
  }>({ status: false, type: 'ADD' });
  const [form] = Form.useForm();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
    refetch: getRequests,
  } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      data: queryparams,
      disableOnMount: true,
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
    }));
  };

  useEffect(() => {
    postRequest(queryparams);
  }, [queryparams]);

  const handleDownload = async () => {
    setIsFileLoading(true);

    try {
      const response = await axios.get(`${routes.api.baseUrl}/api/request/export-excel`, {
        params: { requestCategoryId: queryparams.Category },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement('a');
      a.href = url;
      a.download = `${queryparams.RequestTitle == undefined ? 'All' : queryparams.RequestTitle}.xlsx`;
      document?.body?.appendChild(a);
      a.click();

      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setIsFileLoading(false);
    }
  };

  const onClose = async () => {
    setDrawerStatus({ status: false, type: 'ADD' });
    form.resetFields();
  };

  const showFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const { data: categories } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const { refetch: requestDelete } = useQueryApiClient({
    request: {
      url: `${
        requestId?.type == 'RECOVER' ? '/api/request/recover-request' : '/api/request/delete-request'
      }?id=${requestId?.id}`,
      method: requestId?.type == 'RECOVER' ? 'PUT' : 'DELETE',
    },
    onSuccess() {
      Notification({ text: t('requestDeleted'), type: 'success' });
      getRequests();
      onClose();
      setConiformModal(null);
    },
  });

  const handleDelete = (id: number, type: 'DELETE' | 'RECOVER') => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          setRequestId({ type: type, id: id });
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  useEffect(() => {
    if (requestId?.id) {
      requestDelete();
    }
  }, [requestId]);

  const { data: filterValue } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });
  return (
    <StyledRequests>
      {!isFileLoading ? (
        <React.Fragment>
          <div className="header-line">
            <h1 className="global-title">{t('manage_requests')}</h1>
            <div className="upload-download">
              <Button className={'down-upload'} label={t('download')} type="primary" onClick={handleDownload} />
              <Button
                className={'down-upload'}
                label={t('add_new_request')}
                type="primary"
                onClick={() => setDrawerStatus({ status: true, type: 'ADD' })}
              />
            </div>
          </div>
          <RequestFilter filterValue={filterValue} handleFilterChange={handleFilterChange} isDeleted={0} />

          <RequestList
            setQueryParams={setQueryParams}
            requests={requests?.data || []}
            categories={categories?.data || []}
            isRequestsLoading={isRequestsLoading}
            setDrawerStatus={setDrawerStatus}
          />

          <Pagination
            total={requests?.data?.totalItems}
            pageSize={requests?.data?.itemsPerPage}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={requests?.data?.PageIndex}
          />
        </React.Fragment>
      ) : (
        <div className="spinnig-wrrap">
          <Spinner spinning={true} />
        </div>
      )}

      <Drawer width={600} title={t('request_action')} onClose={onClose} open={drawerStatus.status}>
        <Form form={form} layout="vertical">
          <InputSelection
            setDrawerStatus={setDrawerStatus}
            handleDelete={handleDelete}
            drawerStatus={drawerStatus}
            getRequests={getRequests}
            form={form}
            onClose={onClose}
          />
        </Form>
      </Drawer>

      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledRequests>
  );
}
