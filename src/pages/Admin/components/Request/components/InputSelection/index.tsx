import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption, TextArea } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import { RequestModel } from '../RequestList/type';
import dayjs from 'dayjs';
import SvgSelector from 'assets/icons/SvgSelector';

interface Props {
  form: FormInstance;
  onClose: () => void;
  getRequests: () => void;
  drawerStatus: {
    status: boolean;
    type: 'VIEW' | 'EDIT' | 'ADD';
    request?: RequestModel;
    sequence?: number;
  };
  handleDelete?: (id: number, type: 'DELETE' | 'RECOVER') => void;
  setDrawerStatus: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      type: 'VIEW' | 'EDIT' | 'ADD';
      request?: RequestModel;
      sequence?: number;
    }>
  >;
}

export function InputSelection({ form, onClose, getRequests, drawerStatus, handleDelete, setDrawerStatus }: Props) {
  const { t } = useTranslation();
  const [disable, setDisable] = useState<boolean>(false);
  const isDeletedRequesdts = window.location.pathname.includes('deleted-requests');
  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url:
        drawerStatus.type == 'EDIT'
          ? `api/request/update-request?id=${drawerStatus.request?.id}`
          : '/api/request/create-request',
      method: drawerStatus.type == 'EDIT' ? 'PUT' : 'POST',
      multipart: false,
    },
    onSuccess() {
      getRequests();
      if (drawerStatus.type == 'EDIT') {
        Notification({ text: t('request_created_success'), type: 'success' });
      } else {
        Notification({ text: t('request_updated_success'), type: 'success' });
      }
      onClose();
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
    if (drawerStatus.type == 'VIEW') {
      setDisable(true);
      form.setFieldsValue({
        ...drawerStatus.request,
        deadline: drawerStatus.request?.deadline && dayjs(drawerStatus.request?.deadline),
        requestStatusId: drawerStatus?.request?.requestStatus?.id,
      });
    } else {
      setDisable(false);
    }
  }, [drawerStatus]);

  const handleDeleteRequest = () => {
    if (drawerStatus.request?.isDeleted === 0) {
      handleDelete && handleDelete(drawerStatus?.request?.id, 'DELETE');
    } else {
      handleDelete && handleDelete(drawerStatus?.request?.id || 0, 'RECOVER');
    }
  };

  const handleUpdate = () => {
    setDrawerStatus((prev) => ({
      ...prev,
      type: 'EDIT',
      user: prev.request,
    }));
    setDisable(false);
  };

  return (
    <StyledInputSelection>
      {!isDeletedRequesdts && (
        <div className="title">
          <h1>{t('request_id').replace('id', drawerStatus.sequence?.toString() || '0')}</h1>
          <Button icon={<SvgSelector id="edit" />} onClick={handleUpdate} />
        </div>
      )}

      <div className="form-div">
        <div className="form-content">
          {/* Submission Info */}
          <div className="form-group">
            <h3>{t('submission_info')}</h3>
            <Input disabled={disable} name="date" label={t('date_created')} />
            {/* <div className="date-picker">
              <DatePicker disabled={disable} name="deadline" label={t('deadline')} />
            </div> */}
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

        <div className="form-content">
          {/* Internal Assignment */}
          <div className="form-group">
            <h3>{t('internal_assignment')}</h3>
            <Input name="companyName" disabled={disable} label={t('company_name')} />
            <Input name="department" disabled={disable} label={t('department')} />
            <Input name="responsiblePerson" disabled={disable} label={t('responsible_person')} />
          </div>

          {/* Notes & Status */}
          <div className="form-group">
            <h3>{t('notes_and_status')}</h3>
            <Input name="status" disabled={disable} label={t('processing_status')} />
            <Input name="finalResult" disabled={disable} label={t('final_result')} />
            <TextArea name="notes" disabled={disable} label={t('notes')} rows={3} />
            {/* <Select
              disabled={disable}
              rules={[{ required: true, message: t('field_is_required') }]}
              label={t('priority')}
              name="priority"
            >
              {PRIORITY.map((item: any) => (
                <SelectOption value={item.id} key={item.id}>
                  {t(item.text)}
                </SelectOption>
              ))}
            </Select> */}
            <div className="category">
              <Select
                disabled={disable}
                rules={[{ required: true, message: t('field_is_required') }]}
                label={t('status')}
                name="projectStatus"
              >
                {PROJECT_STATUS.map((item: any) => (
                  <SelectOption value={item.id} key={item.id}>
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
                <SelectOption value="new">{t('new_category')}</SelectOption>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {!isDeletedRequesdts && (
        <div className="action-btns">
          {drawerStatus.type !== 'VIEW' ? (
            <Button label={t('cancel')} onClick={onClose} type="default" className="cancel-button" />
          ) : (
            <>
              <Button label={t('cancel')} onClick={onClose} type="default" className="cancel-button" />
              <Button
                danger
                label={drawerStatus?.request?.isDeleted === 0 ? t('delete') : t('recover')}
                className={drawerStatus?.request?.isDeleted === 0 ? 'delete-button' : 'recover-button'}
                type="primary"
                onClick={handleDeleteRequest}
              />
            </>
          )}
          {drawerStatus.type !== 'VIEW' && (
            <Button
              label={drawerStatus.type === 'ADD' ? t('create_request') : t('save_changes')}
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