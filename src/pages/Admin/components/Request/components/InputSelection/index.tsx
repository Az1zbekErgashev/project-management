import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption, Tabs, TextArea, Upload } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PROJECT_STATUS } from 'utils/consts';
import { RequestModel } from '../RequestList/type';
import dayjs from 'dayjs';


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

export function InputSelection({ form, actionStatus, setActionStatus }: Props) {
  const { t } = useTranslation();
  const [disable, setDisable] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string; type: string } | null>(null);
  const isDeletedRequesdts = window.location.pathname.includes('deleted-requests');

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
              <Upload className="upload-box">
                <div className="centeredFileName"></div>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      {!isDeletedRequesdts && (
        <div className="action-btns">
          {actionStatus && actionStatus.type !== 'VIEW' ? (
            <Button label={t('cancel')} type="default" className="cancel-button" />
          ) : (
            <>
              <Button label={t('cancel')} type="default" className="cancel-button" />
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
