import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Input, Notification, Select, SelectOption } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import { RequestModel } from '../RequestList/type';
import dayjs from 'dayjs';

interface Props {
  form: FormInstance;
  onClose: () => void;
  getRequests: () => void;
  drawerStatus: {
    status: boolean;
    type: 'VIEW' | 'EDIT' | 'ADD';
    request?: RequestModel;
  };
  handleDelete: (id: number, type: 'DELETE' | 'RECOVER') => void;
}

export function InputSelection({ form, onClose, getRequests, drawerStatus, handleDelete }: Props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [disable, setDisable] = useState<boolean>(false);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: '/api/request/create-request',
      method: 'POST',
      multipart: false,
    },
    onSuccess() {
      getRequests();
      Notification({ text: t('input_created_success'), type: 'success' });
      onClose();
      form.resetFields();
    },
    onError() {
      Notification({ text: t('input_creation_failed'), type: 'error' });
    },
  });

  console.log(drawerStatus);

  const handleSubmit = async () => {
    try {
      console.log('working handle submit');
      // const values = await form.validateFields();
      const values = form.getFieldsValue();
      console.log('values', values);
      createData({ ...values });
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const { data: categoryData, refetch } = useQueryApiClient({
    request: {
      url: '/api/request/category',
      method: 'GET',
    },
  });

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value);
  };

  const { appendData } = useQueryApiClient({
    request: {
      url: '/api/request/create',
      method: 'POST',
    },
    onSuccess() {
      refetch();
      setSelectedCategory(null);
      form.setFieldValue('requestStatusId', null);
      form.setFieldValue('newRequestStatus', null);
    },
  });

  const handleNewCategorySubmit = () => {
    var value = form.getFieldsValue();
    appendData({ title: value.newRequestStatus });
  };

  useEffect(() => {
    if (drawerStatus.type == 'VIEW') {
      setDisable(true);
      form.setFieldsValue({
        ...drawerStatus.request,
        deadline: drawerStatus.request?.deadline && dayjs(drawerStatus.request?.deadline),
        date: drawerStatus.request?.date && dayjs(drawerStatus.request?.date),
        requestStatusId: drawerStatus?.request?.requestStatus?.id,
      });
    } else {
      setDisable(false);
    }
  }, [drawerStatus]);

  const handleDeleteRequest = () => {
    if (drawerStatus.request?.isDeleted === 0) {
      handleDelete(drawerStatus?.request?.id, 'DELETE');
    } else {
      handleDelete(drawerStatus?.request?.id || 0, 'RECOVER');
    }
  };

  return (
    <StyledInputSelection>
      <div className="form-div">
        <div className="form-content">
          <div className="date-picker">
            <DatePicker disabled={disable} name="date" label={t('date_created')} />
          </div>
          <Input name="inquiryType" disabled={disable} label={t('inquiry_type')} />

          <Input name="companyName" disabled={disable} label={t('company_name')} />
          <Input name="department" disabled={disable} label={t('department')} />
          <Input name="responsiblePerson" disabled={disable} label={t('responsible_person')} />
          <Input name="inquiryField" disabled={disable} label={t('inquiry_field')} />
          <Input name="clientCompany" disabled={disable} label={t('client_company')} />
          <Select
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
            <SelectOption value="new">{t('new_category')}</SelectOption>
          </Select>
        </div>
        <div className="form-content">
          <div className="date-picker">
            <DatePicker disabled={disable} name="deadline" label={t('deadline')} />
          </div>
          <Input name="projectDetails" disabled={disable} label={t('project_details')} />
          <Input name="client" disabled={disable} label={t('client')} />
          <Input name="contactNumber" disabled={disable} label={t('contact_number')} />
          <Input name="email" disabled={disable} label={t('email')} />
          <Input name="responseStatus" disabled={disable} label={t('processing_status')} />
          <Input name="finalResult" disabled={disable} label={t('final_result')} />
          <Input name="notes" disabled={disable} label={t('notes')} />
        </div>
      </div>
      <div className="category">
        <Select
          disabled={disable}
          rules={[{ required: true, message: t('field_is_required') }]}
          label={t('status')}
          name="status"
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
          value={selectedCategory ?? ''}
          onChange={handleCategoryChange}
          disabled={disable}
        >
          {categoryData?.data?.map((item: any) => (
            <SelectOption value={item.id} key={item.id}>
              {item.title}
            </SelectOption>
          ))}
          <SelectOption value="new">{t('new_category')}</SelectOption>
        </Select>

        {selectedCategory === 'new' && (
          <div className="category_input">
            <Input
              disabled={disable}
              rules={[{ required: true, message: t('field_is_required') }]}
              label={t('new_category')}
              name="newRequestStatus"
              onChange={(e) => console.log(form.getFieldsValue())}
              placeholder={t('enter_category_name')}
            />
            <Button onClick={handleNewCategorySubmit} label={t('add')} type="primary" />
          </div>
        )}
      </div>
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
    </StyledInputSelection>
  );
}
