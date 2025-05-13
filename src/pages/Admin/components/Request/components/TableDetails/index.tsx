// TableDetail.tsx
import React, { useEffect, useState } from 'react';
import { Form, TabsProps } from 'antd';
import { HistoryOutlined } from '@ant-design/icons'; // Remove MessageOutlined
import { useTranslation } from 'react-i18next';
import { InputSelection } from '../InputSelection';
import { StyledTableDetail } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, Button, ConfirmModal, Tabs } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { TFunction } from 'i18next';
import { HistorySection } from 'components';
import dayjs from 'dayjs';
import { smoothScroll } from 'utils/globalFunctions';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_requests_title'),
  content: t('delete_requests_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function TableDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [filePath, setFilePath] = useState<string | null>(null);
  const [disable, setDisable] = useState<boolean>(true);
  const [actionModal, setActionModal] = useState<any>();

  const { refetch: handleFetchClick, data: request } = useQueryApiClient({
    request: {
      url: `/api/request/requets/${id}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(response) {
      form.setFieldsValue({
        ...response.data,
        requestStatusId: response?.data?.requestStatus?.id,
        date: response?.data?.date ? dayjs(response.data.date) : null,
        processingStatus: response?.data?.processingStatus?.id ?? null,
      });
      setFilePath(response?.data?.file?.path);
    },
  });

  useEffect(() => {
    if (window.location.pathname.includes('request-detail')) {
      handleFetchClick();
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes('add-requests')) setDisable(false);
    else setDisable(true);
  }, []);

  const { refetch: handleDelete } = useQueryApiClient({
    request: {
      url: `/api/request/delete-request?id=${id}`,
      method: 'DELETE',
    },
    onSuccess() {
      navigate(-1);
    },
  });

  const handleDeleteModal = () => {
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
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className="custom-tab-label">
          <HistoryOutlined /> <span>{t('history')}</span>
        </div>
      ),
      children: <HistorySection requestId={id!} />,
    },
  ];

  useEffect(() => {
    smoothScroll('top', 0);
  }, []);

  return (
    <StyledTableDetail>
      <div className="table-detail">
        <div className="header-line">
          <div className="title-line">
            <div className="back-buttton">
              <BackButton onClick={() => navigate(-1)} color="black" label={t('back')} />
            </div>
            <h2 className="global-title">{t('request_action')}</h2>
          </div>
          {disable && window.location.pathname.includes('request-detail') && (
            <div className="header-btn">
              <Button onClick={handleDeleteModal} className="btn" danger label={t('delete')} />
              <Button onClick={() => setDisable(false)} className="btn" type="primary" label={t('edit_request')} />
            </div>
          )}
        </div>

        <Form form={form} layout="vertical" className="form">
          <InputSelection
            setFilePath={setFilePath}
            filePath={filePath}
            request={request}
            setDisable={setDisable}
            disable={disable}
            form={form}
            handleFetchClick={handleFetchClick}
          />
        </Form>
        <br />
        {!window.location.pathname.includes('/add-requests') && (
          <Tabs type="card" items={items} animated={{ inkBar: true, tabPane: true }} className="custom-tabs" />
        )}
      </div>
      {actionModal && <ConfirmModal {...actionModal} />}
    </StyledTableDetail>
  );
}
