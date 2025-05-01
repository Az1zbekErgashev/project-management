import React, { useEffect, useState } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { Button, Spinner, Modal } from 'ui';
import { StyledRequests } from './style';
import axios from 'axios';
import { routes } from 'config/config';
import { RequestFilter } from './components/RequestFilter';
import UploadModal from './components/Upload/upload';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useJwt from 'utils/useJwt';
import { useLanguage } from 'contexts/LanguageContext';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  Text?: string[];
  Category?: string;
  RequestTitle?: string;
}

export function Request() {
  const { t } = useTranslation();
  const [searchParams, _] = useSearchParams();
  const [queryparams, setQueryParams] = useState<queryParamsType>({
    PageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    PageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [filetState, setFileState] = useState<{ name: string; file: File } | null>(null);
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
    postRequest({
      ...queryparams,
    });
  }, [queryparams]);

  const handleDownload = async () => {
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
        // Show the main RequestList view
        <React.Fragment>
          <div className="header-line">
            <h1 className="global-title">{t('manage_requests')}</h1>
            <div className="upload-download">
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
              <Button className={'down-upload'} label={t('download')} type="primary" onClick={handleDownload} />
              <Button
                className={'down-upload'}
                label={t('add_new_request')}
                type="primary"
                onClick={() => navigate('/add-requests')}
              />
            </div>
          </div>
          <RequestFilter categories={categories} handleFilterChange={handleFilterChange} isDeleted={0} />

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
      )}
    </StyledRequests>
  );
}
