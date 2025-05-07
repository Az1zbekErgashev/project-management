import React, { useEffect, useState } from 'react';
import { StyledRequestStatusPage } from './style';
import { Button, ConfirmModal, Input, Table, Notification } from 'ui';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { Checkbox, ColorPicker, Form, Modal } from 'antd';
import { StyledTranslation } from '../Translations/styled';
import { useSearchParams } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';

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
  const [open, setOpen] = useState<{ open: boolean; type: 'ADD' | 'EDIT'; status: any }>({
    open: false,
    type: 'ADD',
    status: null,
  });
  const [searchParams, _] = useSearchParams();
  const [queryParams, setQueryParams] = useState<{ pageIndex: number; pageSize: number }>({
    pageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });
  const [color, setColor] = useState<string>('#1677ff');
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [id, setId] = useState<number | null>(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data: requestStatus, refetch } = useQueryApiClient({
    request: {
      url: `/api/processingstatus`,
      disableOnMount: true,
      data: queryParams,
    },
  });

  const columns: ColumnsType<any> = [
    {
      title: (
        <Checkbox
          checked={selectedIds.length > 0 && selectedIds.length === requestStatus?.data?.items.length}
          indeterminate={selectedIds.length > 0 && selectedIds.length < requestStatus?.data?.items.length}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              const allIds = requestStatus?.data?.items.map((item: { id: any; }) => item.id) || [];
              setSelectedIds(allIds);
            } else {
              setSelectedIds([]);
            }
          }}
        />
      ),
      key: 'select',
      fixed: 'left',
      width: 50,
      render: (_: any, record: { id: number; }) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedIds((prev) =>
              checked ? [...prev, record.id] : prev.filter((id) => id !== record.id)
            );
          }}
        />
      ),
    },
    
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
      render: (_: any, record: any, index: number) =>
        (requestStatus?.data?.pageIndex - 1) * requestStatus?.data?.itemsPerPage + index + 1,
    },
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
            onClick={() => setOpen({ type: 'EDIT', open: true, status: record })}
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

  const { refetch: deleteRequest } = useQueryApiClient({
    request: {
      url: `/api/processingstatus?id=${id}`,
      method: 'DELETE',
    },
    onSuccess() {
      refetch();
    },
  });

  const { refetch: deleteRequests } = useQueryApiClient({
    request: {
      url: '/api/processingstatus/list',
      method: 'DELETE',
      data: selectedIds
    },
    onSuccess: () => {
      Notification({ type: 'info', text: t('request_deleted') });
      setSelectedIds([]);
      refetch(); 
    },
    onError: () => {
      Notification({ type: 'error', text: t('failed_to_delete_requests') });
    },
  });

  console.log(selectedIds);

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    await deleteRequests();
  };
  
  const { appendData: createData } = useQueryApiClient({
    request: {
      url: '/api/processingstatus',
      method: 'POST',
    },
    onSuccess() {
      refetch();
    },
  });
  const { appendData: updateData } = useQueryApiClient({
    request: {
      url: '/api/processingstatus',
      method: 'PUT',
    },
    onSuccess() {
      refetch();
    },
  });

  useEffect(() => {
    refetch();
  }, [queryParams]);

  useEffect(() => {
    if (id) {
      deleteRequest();
      setId(null);
      setConiformModal(null);
    }
  }, [id]);

  const handleClose = () => {
    setOpen({ open: false, type: 'ADD', status: null });
    form.resetFields();
    setColor('#1677ff');
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((res) => {
        if (open.type == 'ADD') {
          createData({ text: res.text, color: res.color.toHexString() });
        } else {
          updateData({ text: res.text, color: res.color.toHexString(), id: open?.status?.id });
        }
        handleClose();
      })
      .catch((e) => {
        return;
      });
  };

  useEffect(() => {
    if (open.type === 'EDIT') {
      form.setFieldsValue({ ...open.status });
      setColor(open?.status?.color || '#1677ff');
    }
  }, [open]);

  return (
    <StyledRequestStatusPage>
      <div className="header-line">
        <h1 className="global-title">{t('statuses')}</h1>
      <div style={{display: "flex", gap: "10px"}}> 
        {selectedIds.length > 0 && (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteSelected()}
          label={t('delete_selected')}
       />
      )}
        <Button
          label={t('add_request_status')}
          type="primary"
          onClick={() => setOpen({ type: 'ADD', open: true, status: null })}
        />
      </div>
      </div>

      <div className="table-div">
        <Table columns={columns} dataSource={requestStatus?.data?.items || null} />
        <Pagination
          total={requestStatus?.data?.totalItems}
          pageSize={requestStatus?.data?.itemsPerPage}
          onChange={handlePaginationChange}
          hideOnSinglePage={true}
          current={requestStatus?.data?.PageIndex}
        />
      </div>

      <Modal
        forceRender={true}
        onCancel={handleClose}
        title={t('colors_action_title')}
        open={open.open}
        footer={null}
        width={700}
      >
        <StyledTranslation className="statuses">
          <Form className="action-form " form={form} layout="vertical">
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
