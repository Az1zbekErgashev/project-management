import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption, TextArea, Upload } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROCESSING_STATUS, PROJECT_STATUS } from 'utils/consts';
import { CloseCircleOutlined, FileDoneOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'config/config';
import Tooltip from 'antd/lib/tooltip';

interface Props {
  form: FormInstance;
  disable: boolean;
  setDisable: any;
  request: any;
  filePath: string | null;
  setFilePath: (value: string | null) => void;
}

export function InputSelection({ form, disable, setDisable, request, filePath, setFilePath }: Props) {
  const [fileList, setFileList] = useState<File | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isDeletedRequesdts = window.location.pathname.includes('deleted-requests');

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: window.location.pathname.includes('request-detail')
        ? `api/request/update-request?id=${id}`
        : '/api/request/create-request',
      method: window.location.pathname.includes('request-detail') ? 'PUT' : 'POST',
      multipart: true,
    },
    onSuccess() {
      setFileList(null);
      if (!window.location.pathname.includes('request-detail')) {
        Notification({ text: t('request_created_success'), type: 'success' });
      } else {
        Notification({ text: t('request_updated_success'), type: 'success' });
      }
      form.resetFields();
      navigate(-1);
    },
    onError() {
      Notification({ text: t('input_creation_failed'), type: 'error' });
    },
  });

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((res) => {
        res.File = fileList;
        if (window.location.pathname.includes('request-detail')) {
          res.UpdateFile = fileList ? true : false;
          res.RemoveFile = !fileList && !filePath ? true : false;
        }
        createData(res);
      })
      .catch(() => {
        return;
      });
  };

  const { data: categoryData } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const handleChange = (file: any) => {
    const realFile =
      file?.file instanceof File
        ? file.file
        : file?.file?.originFileObj instanceof File
          ? file.file.originFileObj
          : null;

    setFileList(realFile ? realFile : null);
  };

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <StyledInputSelection>
      <div className="form-div">
        <div className="form">
          <div className="form-content">
            <div className="form-group">
              <h3>{t('submission_info')}</h3>
              <DatePicker disabled={disable} name="date" label={t('date_created')} />
            </div>

            {/* Inquiry Details */}
            <div className="form-group">
              <h3>{t('inquiry_details')}</h3>
              <Input name="inquiryType" disabled={disable} label={t('inquiry_type')} />
              <Input name="projectDetails" disabled={disable} label={t('project_details')} />
              <Input name="inquiryField" disabled={disable} label={t('inquiry_field')} />
            </div>

            {/* Client Information */}
            <div className="form-group">
              <h3>{t('client_information')}</h3>
              <Input name="clientCompany" disabled={disable} label={t('client_company')} />
              <Input name="client" disabled={disable} label={t('client')} />
              <Input name="contactNumber" disabled={disable} label={t('contact_number')} />
              <Input name="email" disabled={disable} label={t('email')} />
            </div>
          </div>

          <div className="form-cont">
            <div className="form-group">
              <h3>{t('internal_assignment')}</h3>
              <Input name="companyName" disabled={disable} label={t('company_name')} />
              <Input name="department" disabled={disable} label={t('department')} />
              <Input name="responsiblePerson" disabled={disable} label={t('responsible_person')} />
            </div>

            {/* Status */}
            <div className="form-group">
              <h3>{t('status')}</h3>

                <div className="category">
                <Select
                  disabled={disable}
                  rules={[{ required: true, message: t('field_is_required') }]}
                  label={t('processing_status')}
                  name="processingStatus"
                >
                  {PROCESSING_STATUS.map((item: any) => (
                    <SelectOption value={item.text} key={item.id}>
                      {t(item.text)}
                    </SelectOption>
                  ))}
                </Select>
              </div>              
              <div className="category">
                <Select
                  disabled={disable}
                  rules={[{ required: true, message: t('field_is_required') }]}
                  label={t('status')}
                  name="status"
                >
                  {PROJECT_STATUS.map((item: any) => (
                    <SelectOption value={item.text} key={item.id}>
                      {t(item.text)}
                    </SelectOption>
                  ))}
                </Select>
              </div>
              <div className="category">
                <Select
                  rules={[{ required: true, message: t('field_is_required') }]}
                  label={t('category')}
                  name="requestStatusId"
                  disabled={disable}
                >
                  {categoryData?.data?.map((item: any) => (
                    <SelectOption value={item.id} key={item.id}>
                      {item.title}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>
  
          </div>
        </div>

        <div className="text-area">
          <div className="form-group">
            <h3>{t('notes')}</h3>
            <TextArea name="notes" disabled={disable} label={t('notes')} rows={8} />
          </div>
          <div>
            {!isDeletedRequesdts && (
              <div className="action-btns">
                {window.location.pathname.includes('request-detail') && !disable && (
                  <Button
                    onClick={() => setDisable(true)}
                    label={t('cancel_to_view_mode')}
                    htmlType="button"
                    loading={isLoading}
                  />
                )}
                {!disable && (
                  <Button
                    label={
                      !window.location.pathname.includes('request-detail') ? t('create_request') : t('save_changes')
                    }
                    type="primary"
                    htmlType="button"
                    onClick={handleSubmit}
                    loading={isLoading}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        
      </div>
      <div className='upload-container'>
      <div className="form-group upload-group">
              <div className="upload-container">
                {(fileList || filePath) && (
                  <Tooltip
                    color="#ffffff"
                    style={{ color: 'black' }}
                    placement="top"
                    title={<span style={{ color: 'var(--black)' }}>{t('delete_attachment')}</span>}
                    trigger={'hover'}
                  >
                    <button
                      disabled={disable}
                      onClick={() => {
                        setFileList(null);
                        setFilePath(null);
                      }}
                      className="delete-svg"
                    >
                      <CloseCircleOutlined />
                    </button>
                  </Tooltip>
                )}
                <Upload disabled={disable || !!filePath} onChange={handleChange}>
                  <div className={!fileList && !filePath ? 'upload-form big' : 'upload-form small'}>
                    <FileDoneOutlined />
                    {(fileList || filePath) && (
                      <div className="file_name">
                        {fileList ? (
                          <>
                            <div>
                              <span>{fileList?.name}</span>
                            </div>
                            <div>
                              <span>{formatSize(fileList?.size || 0)}</span>
                            </div>
                          </>
                        ) : (
                          <Button
                            type="link"
                            onClick={() => window.open(`${routes.api.baseUrl}/${filePath}`, '_blank')}
                            label={t('view_file')}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </Upload>
              </div>
        </div>
      </div>
    </StyledInputSelection>
  );
}
