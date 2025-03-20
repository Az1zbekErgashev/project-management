import React, { useState } from 'react';
import { StyledProfile } from './style';
import { Form } from 'antd';
import { ProfileActionForm } from './components/ProfileActionForm';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { Button } from 'ui';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const [actionForm, setActionForm] = useState<{ type: 'VIEW' | 'EDIT' }>({ type: 'VIEW' });
  const [image, setImage] = useState<{ img: File | null; path: string | null; type: 'ADD' | 'DELETE' }>();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useQueryApiClient({
    request: {
      url: '/api/user/profile',
      method: 'GET',
    },
    onSuccess(res) {
      form.setFieldsValue({
        ...res.data,
        countryId: res.data?.country?.id,
        dateOfBirth: res.data?.dateOfBirth && dayjs(res.data.dateOfBirth),
        role: res.data?.roleId,
      });
      setImage({ img: null, path: res.data?.image?.path, type: 'ADD' });
    },
  });
  return (
    <StyledProfile>
      <Form form={form} layout="vertical">
        <ProfileActionForm
          actionForm={actionForm}
          setActionForm={setActionForm}
          image={image}
          setImage={setImage}
          passwordStatus={passwordStatus}
          setPasswordStatus={setPasswordStatus}
        />
        <div className="actions">
          <Button label={t('cancel')} />
          <Button label={t('save_changes')} type="primary" />
        </div>
      </Form>
    </StyledProfile>
  );
}
