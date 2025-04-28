import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Notification, Select, SelectOption, TextArea, Upload } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestModel } from '../RequestList/type';

import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

type ActionStatus = {
  type: 'VIEW' | 'EDIT' | 'ADD';
  request?: RequestModel;
} | null;

interface Props {
  form: FormInstance;

  disable: boolean;
  setDisable: any;
}

export function InputSelection({ form, disable, setDisable }: Props) {
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
        console.log(fileList);
        console.log(res);

        res.File = fileList;
        if (window.location.pathname.includes('request-detail')) {
          res.UpdateFile = fileList ? true : null;
        }

        console.log(res);

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

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
              <Select
                name="requestStatusId"
                rules={[{ required: true, message: t('this_field_required') }]}
                label={t('category')}
                disabled={disable}
              >
                {categoryData?.data?.map((item: any, index: any) => (
                  <SelectOption key={index} value={item.id}>
                    {item.title}
                  </SelectOption>
                ))}
              </Select>
              <Select
                rules={[{ required: true, message: t('this_field_required') }]}
                name="status"
                label={t('status')}
                disabled={disable}
              >
                {PROJECT_STATUS.map((item, index) => (
                  <SelectOption key={index} value={item.text}>
                    {item.text}
                  </SelectOption>
                ))}
              </Select>

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
                disabled={disable}
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                className="upload-box"
              >
                <div className="centeredFileName">
                  {fileList == null ? (
                    uploadButton
                  ) : (
                    <div className="uploaded-file">
                      <div className="flex">
                        <div>
                          <span>{t('file_name')}</span>
                          <span>{fileList.name}</span>
                        </div>
                        <div>
                          <span>{t('size')}</span>
                          <span>{formatSize(fileList.size || 0)}</span>
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
              label={!window.location.pathname.includes('request-detail') ? t('create_request') : t('save_changes')}
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
