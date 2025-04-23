import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption, Tabs, TextArea, Upload } from 'ui';
import { FormInstance, GetProp, UploadFile, UploadProps } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestModel } from '../RequestList/type';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
type ActionStatus = {
  type: 'VIEW' | 'EDIT' | 'ADD';
  request?: RequestModel;
} | null;

interface Props {
  form: FormInstance;
  actionStatus: {
    type: 'VIEW' | 'EDIT' | 'ADD';
    request?: RequestModel;
  } | null;
  setActionStatus: React.Dispatch<React.SetStateAction<ActionStatus>>;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function InputSelection({ form, actionStatus, setActionStatus }: Props) {
  const { t } = useTranslation();
  const [disable, setDisable] = useState<boolean>(false);
  const isDeletedRequesdts = window.location.pathname.includes('deleted-requests');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url:
        actionStatus && actionStatus.type == 'EDIT'
          ? `api/request/update-request?id=${actionStatus.request?.id}`
          : '/api/request/create-request',
      method: actionStatus && actionStatus.type == 'EDIT' ? 'PUT' : 'POST',
      multipart: false,
    },
    onSuccess() {
      if (actionStatus && actionStatus.type == 'EDIT') {
        Notification({ text: t('request_created_success'), type: 'success' });
      } else {
        Notification({ text: t('request_updated_success'), type: 'success' });
      }
      form.resetFields();
    },
    onError() {
      Notification({ text: t('input_creation_failed'), type: 'error' });
    },
  });

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((res) => {
        res.deadline = res.deadline !== null ? dayjs(res.deadline) : null;
        createData(res);
      })
      .catch(() => {
        return;
      });
  };

  const { data: categoryData, refetch } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  useEffect(() => {
    if (actionStatus && actionStatus.type == 'VIEW') {
      setDisable(true);
      form.setFieldsValue({
        ...actionStatus.request,
        requestStatusId: actionStatus?.request?.requestStatus?.id,
      });
    } else if (window.location.pathname.includes('add-requests')) {
      setActionStatus((prev) => ({
        ...prev,
        type: 'ADD',
      }));
    } else {
      setDisable(false);
    }
  }, [actionStatus]);

  const handleDeleteRequest = () => {
    // if (actionStatus && actionStatus.request?.isDeleted === 0) {
    //   handleDelete && handleDelete(actionStatus && actionStatus?.request?.id, 'DELETE');
    // } else {
    //   handleDelete && handleDelete(actionStatus?.request?.id || 0, 'RECOVER');
    // }
  };

  const handleUpdate = () => {
    setActionStatus &&
      setActionStatus((prev) => ({
        ...prev,
        type: 'EDIT',
        request: prev?.request,
      }));
    setDisable(false);
  };

  const handlePreview = async (file: UploadFile) => {
    const isImage = file.type?.startsWith('image');

    if (isImage) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
    } else {
      const fileURL = file.url || URL.createObjectURL(file.originFileObj as Blob);
      window.open(fileURL, '_blank');
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange = ({ file }: { file: UploadFile }) => {
    setFileList(file ? [file] : []);
  };

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <StyledInputSelection>
      <div className="fields">
        <div className="rows">
          <div className="cards">
            <div className="card_header">
              <h3>{t('dates')}</h3>
            </div>
            <div className="inputs">
              <Input disabled={disable} name="date" label={t('date_created')} />
            </div>
          </div>
          <div className="cards">
            <div className="card_header">
              <h3>{t('inquiry_details')}</h3>
            </div>
            <div className="inputs">
              <Input name="inquiryType" disabled={disable} label={t('inquiry_type')} />
              <Input name="projectDetails" disabled={disable} label={t('project_details')} />
              <Input name="inquiryField" disabled={disable} label={t('inquiry_field')} />
            </div>
          </div>
          <div className="cards">
            <div className="card_header">
              <h3>{t('notes_and_status')}</h3>
            </div>
            <div className="inputs">
              <Input name="status" disabled={disable} label={t('status')} />
              <TextArea allowClear name="notes" disabled={disable} label={t('notes')} rows={3} />
            </div>
          </div>
        </div>
        <div className="rows">
          <div className="cards">
            <div className="card_header">
              <h3>{t('internal_assignment')}</h3>
            </div>
            <div className="inputs">
              <Input name="companyName" disabled={disable} label={t('company_name')} />
              <Input name="department" disabled={disable} label={t('department')} />
              <Input name="responsiblePerson" disabled={disable} label={t('responsible_person')} />
            </div>
          </div>
          <div className="cards">
            <div className="card_header">
              <h3>{t('client_information')}</h3>
            </div>
            <div className="inputs">
              <Input name="clientCompany" disabled={disable} label={t('client_company')} />
              <Input name="client" disabled={disable} label={t('client')} />
              <Input name="contactNumber" disabled={disable} label={t('contact_number')} />
              <Input name="email" disabled={disable} label={t('email')} />
            </div>
          </div>

          <div className="cards">
            <div className="card_header">
              <h3>{t('client_information')}</h3>
            </div>
            <div className="inputs">
              <Upload
                fileList={fileList}
                onChange={handleChange}
                onPreview={handlePreview}
                maxCount={1}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                className="upload-box"
              >
                <div className="centeredFileName">
                  {fileList.length === 0 ? (
                    uploadButton
                  ) : (
                    <div className="uploaded-file">
                      <div className="flex">
                        <div>
                          <span>{t('file_name')}</span>
                          <span>{fileList[0].name}</span>
                        </div>
                        <div>
                          <span>{t('size')}</span>
                          <span>{formatSize(fileList[0].size || 0)}</span>
                        </div>
                        <br />
                      </div>
                    </div>
                  )}
                </div>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      {!isDeletedRequesdts && (
        <div className="action-btns">
          {actionStatus && actionStatus.type !== 'VIEW' ? (
            <></>
          ) : (
            <>
              <Button
                danger
                label={actionStatus?.request?.isDeleted === 0 ? t('delete') : t('recover')}
                className={actionStatus?.request?.isDeleted === 0 ? 'delete-button' : 'recover-button'}
                type="primary"
                onClick={handleDeleteRequest}
              />
            </>
          )}
          {actionStatus && actionStatus.type !== 'VIEW' && (
            <Button
              label={actionStatus && actionStatus.type === 'ADD' ? t('create_request') : t('save_changes')}
              type="primary"
              htmlType="button"
              onClick={handleSubmit}
              loading={isLoading}
            />
          )}
        </div>
      )}
    </StyledInputSelection>
  );
}
