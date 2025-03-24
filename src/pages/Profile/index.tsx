import React, { useState } from 'react';
import { StyledProfile } from './style';
import { Form } from 'antd';
import { ProfileActionForm } from './components/ProfileActionForm';
import useQueryApiClient from 'utils/useQueryApiClient';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Notification } from 'ui';
import { useTranslation } from 'react-i18next';
import { useUser } from 'hooks/useUserState';

export function Profile() {
  const [actionForm, setActionForm] = useState<{ type: 'VIEW' | 'EDIT' }>({ type: 'VIEW' });
  const [image, setImage] = useState<{ img: File | null; path: string | null; type: 'ADD' | 'DELETE' }>();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useUser();
  const [opened, setOpened] = useState(false);

  // Fetch user profile
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

  const { appendData } = useQueryApiClient({
    request: {
      url: '/api/user/update',
      method: 'PATCH',
      multipart: true,
    },
    onSuccess(res) {
      console.log('Profile updated successfully', res);
      Notification({ text: t('input_created_successfully'), type: 'success' });
      setActionForm({ type: 'VIEW' });
    },
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        values.dateOfBirth = values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null;
        if (image?.img) values.image = image.img;

        values.UserId = user.id;
        if (Object.keys(values).length > 0) {
          appendData(values);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

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
          <Button
            label={t('save_changes')}
            type="primary"
            onClick={handleUpdate}
            loading={isLoading}
          />
        </div>
      </Form>
    </StyledProfile>
  );
}
