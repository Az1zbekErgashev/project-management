import React, { useEffect, useState } from 'react';
import { StyledRequestStatusPage } from './style';
import { Button, ConfirmModal, Input, Table } from 'ui';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { ColorPicker, Form, Modal } from 'antd';
import { StyledTranslation } from '../Translations/styled';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_request_status_title'),
  content: t('delete_request_status_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function RequestStatusPage() {
  const [open, setOpen] = useState<{ open: boolean; type: 'ADD' | 'EDIT'; translation: any }>({
    open: false,
    type: 'ADD',
    translation: null,
  });
  const [queryParams, setQueryParams] = useState<{ pageIndex: number; pageSize: number }>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [color, setColor] = useState<string>('#1677ff');
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [id, setId] = useState<number | null>(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const columns = [
    { title: t('id'), dataIndex: 'id', key: 'id' },
    { title: t('color_title'), dataIndex: 'text', key: 'text' },
    {
      title: t('color'),
      dataIndex: 'color',
      key: 'color',
      render: (color: any, _: any) => (
        <div className="color-container">
          <div className="color-span" style={{ background: color }}></div>
        </div>
      ),
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="actions">
          <Button
            label={t('delete')}
            onClick={() => handleDelete(record.id)}
            danger
            icon={<SvgSelector id="trash" />}
          />
          <Button
            type="primary"
            label={t('edit')}
            icon={<SvgSelector id="edit" />}
            onClick={() => setOpen({ type: 'EDIT', open: true, translation: record })}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (key: number) => {
    setConiformModal(
      createModalConfig(
        t,
        () => {
          setId(key);
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };

  const { data: requestStatus, refetch } = useQueryApiClient({
    request: {
      url: `/api/processingstatus`,
      disableOnMount: true,
      data: queryParams,
    },
  });

  useEffect(() => {
    refetch();
  }, [queryParams]);

  const handleClose = () => {
    setOpen({ open: false, type: 'ADD', translation: null });
    form.resetFields();
    setColor('#1677ff');
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((res) => {})
      .catch((e) => {
        return;
      });
  };

  return (
    <StyledRequestStatusPage>
      <div className="header-line">
        <h1 className="global-title">{t('translations')}</h1>
        <Button
          label={t('add_request_status')}
          type="primary"
          onClick={() => setOpen({ type: 'ADD', open: true, translation: null })}
        />
      </div>

      <div className="table-div">
        <Table columns={columns} dataSource={requestStatus?.data?.items || null} />
        {requestStatus?.data?.totalPages > 1 && (
          <Pagination
            total={requestStatus?.data?.totalItems}
            pageSize={requestStatus?.data?.itemsPerPage}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={requestStatus?.data?.PageIndex}
          />
        )}
      </div>

      <Modal
        forceRender={true}
        onCancel={handleClose}
        title={t('colors_action_title')}
        open={open.open}
        footer={null}
        width={700}
      >
        <StyledTranslation>
          <Form className="action-form" form={form} layout="vertical">
            <div className="inputs">
              <Input
                allowClear
                maxLength={100}
                name="text"
                label={t('color_title')}
                rules={[{ required: true, message: t('field_is_required') }]}
              />

              <div className="color-picker">
                <Form.Item
                  name="color"
                  label={t('color')}
                  rules={[{ required: true, message: t('field_is_required') }]}
                  className="color-picker"
                >
                  <ColorPicker
                    style={{ background: color }}
                    onChange={(color) => setColor(color.toHexString())}
                    defaultValue="#1677ff"
                    allowClear
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="action-button">
            <Button onClick={handleClose} label={t('cancel')} />
            <Button onClick={handleSubmit} type="primary" label={t('save_changes')} />
          </div>
        </StyledTranslation>
      </Modal>

      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledRequestStatusPage>
  );
}
