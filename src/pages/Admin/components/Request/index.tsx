import React, { useEffect, useState } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'ui';
import { StyledRequests } from './style';
import axios from 'axios';
import { routes } from 'config/config';
import { Drawer, Form } from 'antd';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
  RequestTitle?: string;
}

export function Request() {
  const { t } = useTranslation();
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10 });
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [drawerStatus, setDrawerStatus] = useState<boolean>(false);
  const [form] = Form.useForm();

  const {
    data: requests,
    isLoading: isRequestsLoading,
    appendData: postRequest,
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

  useEffect(() => {
    postRequest(queryparams);
  }, [queryparams]);

  const handleDownload = async () => {
    setIsFileLoading(true);

    try {
      const response = await axios.get(`${routes.api.baseUrl}/api/request/export-excel`, {
        params: { requestCategoryId: queryparams.RequestStatusId },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement('a');
      a.href = url;
      a.download = `${queryparams.RequestTitle == undefined ? 'All' : queryparams.RequestTitle}.xlsx`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setIsFileLoading(false);
    }
  };

  const onClose = async () => {
    setDrawerStatus(false);
    form.resetFields();
  };

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
                onClick={() => setDrawerStatus(true)}
              />
            </div>
          </div>

          <RequestList
            setQueryParams={setQueryParams}
            requests={requests?.data || []}
            isRequestsLoading={isRequestsLoading}
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

      <Drawer width={600} title={t('request_action')} onClose={onClose} open={drawerStatus}></Drawer>
    </StyledRequests>
  );
}
