import React from 'react';
import { StyledLoginPage } from './style';
import { Form, Image } from 'antd';
import { Button, Input } from 'ui';
import { useTranslation } from 'react-i18next';
import loginImage from 'assets/images/Login.jpeg';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUser } from 'hooks/useUserState';
import useJwt from 'utils/useJwt';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { setUser } = useUser();
  const { set } = useJwt();
  const navigate = useNavigate();

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: '/api/user/login',
      method: 'POST',
    },
    onSuccess(response) {
      set(response.data.token, 86400);
      setUser(response.data);
      if (response.data.role === 4) navigate('/admin/my-company', { replace: true });
    },
    onError() {
      form.setFields([
        {
          name: 'email',
          errors: [t('emailOrPasswordWrong')],
        },
        {
          name: 'password',
          errors: [t('emailOrPasswordWrong')],
        },
      ]);
    },
  });

  const onFinish = (value: any) => {
    appendData(value);
  };

  return (
    <StyledLoginPage>
      <div className="image-container">
        <Image preview={false} style={{width: "100%", height:"100vh"}} src={loginImage} className="login-image" />
      </div>
      <div className="form-container">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="title">
            <h1>{t('login')}</h1>
          </div>
          <div className="flex">
            <div>
              <Input
                label={t('email')}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: t('emailIsNotValid'),
                  },
                  {
                    required: true,
                    message: t('field_is_required'),
                  },
                ]}
                maxLength={50}
              />
            </div>
            <div>
              <Input
                label={t('password')}
                name="password"
                type="password"
                rules={[{ required: true, message: t('field_is_required') }]}
              />
            </div>
          </div>
          <div className="button">
            <Button label={t('login')} type="primary" htmlType="submit" loading={isLoading} />
          </div>
        </Form>
      </div>
    </StyledLoginPage>
  );
}