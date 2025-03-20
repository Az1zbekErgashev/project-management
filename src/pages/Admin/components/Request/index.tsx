import React, { useEffect, useState } from 'react';
import { RequestList } from './components/RequestList';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'ui';
import UploadModal from './components/Upload/upload';
import Selection from './components/FileSelection';
import { StyledRequests } from './style';

interface queryParamsType {
  PageSize: number;
  PageIndex: number;
  RequestStatusId?: number;
  Date?: string[];
  ClientCompany?: string[];
}

export function Request() {
  const { t } = useTranslation();
  const [queryparams, setQueryParams] = useState<queryParamsType>({ PageIndex: 1, PageSize: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  const handleDelete = () => {
    console.log('delete');
  };

  const handleUpdate = () => {
    console.log('update');
  }

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

  return (
    <StyledRequests>
      <div>
      <div className="header-line">
        <h1 className="global-title">{t('manage_requests')}</h1>
        <div className='upload-download'>
        <Button className={"down-upload"} label={t('download')} type="primary" onClick={handleDelete} />
        <Button className={"down-upload"} label={t('upload')} type="primary" onClick={handleUpdate} />
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

      <Modal
        open={isModalVisible} 
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Selection onClose={() => setIsModalVisible(false)} />
      </Modal>
    </div>
    </StyledRequests>
  );
}
