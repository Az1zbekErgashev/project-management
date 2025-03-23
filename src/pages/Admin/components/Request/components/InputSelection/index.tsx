import { Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Notification } from 'ui';
import { FormInstance } from 'antd/lib';
import { StyledInputSelection } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';

interface Props {
  form: FormInstance;
  onClose: () => void;
}

interface initalQuery {
  PageIndex: number;
  PageSize: number;
  Text?: string;
  TeamLeaderId?: number;
  CompanyId?: number;
  Role?: number;

  IsDeleted?: number;
}

export function InputSelection({ form, onClose }: Props) {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<initalQuery>({ PageIndex: 1, PageSize: 10 });

  const [disable, setDisable] = useState<boolean>(false);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: '/api/request/create-request',
      method: 'POST',
      multipart: false,
    },
    onSuccess() {
      Notification({ text: t('input_created_success'), type: 'success' });
      onClose();
      form.resetFields();
    },
    onError() {
      Notification({ text: t('input_creation_failed'), type: 'error' });
    },
  });

  const { appendData: updateTable } = useQueryApiClient({
    request: {
      url: '/api/request/requets',
      method: 'GET',
      data: queryParams,
    },
    onSuccess(response) {
      console.log('GET /api/request/requets Response:', response);
    },
    onError(error) {
      console.error('GET /api/request/requets Error:', error);
    },
  });

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

  return (
    <StyledInputSelection>
      <div className="form-div">
        <div className="form-content">
          <Input disabled={disable} name="date_created" label={t('date_created')} />
          <Input name="inquiry_type" disabled={disable} label={t('inquiry_type')} />

          <Input name="company_name" disabled={disable} label={t('company_name')} />
          <Input name="department" disabled={disable} label={t('department')} />
          <Input name="responsible_person" disabled={disable} label={t('responsible_person')} />
          <Input name="inquiry_field" disabled={disable} label={t('inquiry_field')} />
          <Input name="client_company" disabled={disable} label={t('client_company')} />
        </div>
        <div className="form-content">
          <Input name="project_details" disabled={disable} label={t('project_details')} />
          <Input name="client" disabled={disable} label={t('client')} />
          <Input name="contact_number" disabled={disable} label={t('contact_number')} />
          <Input name="email" disabled={disable} label={t('email')} />
          <Input name="processing_status" disabled={disable} label={t('processing_status')} />
          <Input name="final_result" disabled={disable} label={t('final_result')} />
          <Input name="notes" disabled={disable} label={t('notes')} />
        </div>
      </div>
      <div className='action-btns'>
        <Button label={t('cancel')} />
        <Button label={t('submit')} type="primary" onClick={handleSubmit} loading={isLoading} />
      </div>
    </StyledInputSelection>
  );
}
