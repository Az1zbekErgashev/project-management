import { Form, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Notification, Select, SelectOption, Upload } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledActionForm } from './style';
import { ROLE } from 'utils/consts';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { defaultImageUrl } from 'utils/consts';
import { routes } from 'config/config';
import SvgSelector from 'assets/icons/SvgSelector';

export function UserInformation() {
  const [image, setImage] = useState<{ img: File | null; path: string | null; type: 'ADD' | 'DELETE' }>();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { appendData } = useQueryApiClient({
    request: {
      url: '/api/user/create-new-user',
      method: 'POST',
      multipart: true,
    },
    onSuccess() {
      Notification({ text: t('user_created_success'), type: 'success' });
      navigate(-1);
    },
  });

  const onFinish = (value: any) => {
    value.image = image?.img;
    appendData(value);
  };

  const { data: company } = useQueryApiClient({
    request: {
      url: '/api/user/all-companys',
      method: 'GET',
    },
  });

  const { data: teams } = useQueryApiClient({
    request: {
      url: '/api/user/team-leaders',
      method: 'GET',
    },
  });

  const { data: country, isLoading: isCountryLoading } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const { refetch: getUser } = useQueryApiClient({
    request: {
      url: `/api/user/${params.id}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(respose) {
      if (respose.data) {
        form.setFieldsValue({ ...respose.data, countryId: respose.data?.country?.id });
      }
    },
  });

  const validateImage = async (file: File): Promise<boolean> => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const minSize = 25 * 1024; // Minimum size in bytes
    const maxSize = 3 * 1024 * 1024; // Maximum size in bytes
    const minWidth = 400; // Minimum width in pixels
    const minHeight = 400; // Minimum height in pixels
    const maxWidth = 1920; // Maximum width in pixels
    const maxHeight = 1280; // Maimum height in pixels

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      Notification({ type: 'error', text: t('CreateCvNotificationAvatarType') });
      return false;
    }

    // Check file size
    if (file.size < minSize || file.size > maxSize) {
      Notification({
        type: 'error',
        text: file.size < minSize ? t('CreateCvNotificationAvatarMinSize') : t('CreateCvNotificationAvatarMaxSize'),
      });

      return false;
    }

    const image = new window.Image();

    image.src = URL.createObjectURL(file);

    return new Promise<boolean>((resolve) => {
      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        if (width < minWidth || height < minHeight || width > maxWidth || height > maxHeight) {
          Notification({
            type: 'error',
            text:
              width < minWidth || height < minHeight
                ? t('CreateCvNotificationAvatarMinDimensions')
                : t('CreateCvNotificationAvatarMaxDimensions'),
          });
          resolve(false);
        } else {
          resolve(true);
        }

        URL.revokeObjectURL(image.src);
      };

      image.onerror = () => {
        Notification({ type: 'error', text: t('CreateCvNotificationAvatarLoadError') });
        resolve(false);
        URL.revokeObjectURL(image.src);
      };
    });
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new window.Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx: any = canvas.getContext('2d');

          const canvasSize = Math.max(img.width, img.height);
          canvas.width = canvasSize;
          canvas.height = canvasSize;

          const offsetX = (canvasSize - img.width) / 2;
          const offsetY = (canvasSize - img.height) / 2;

          ctx!.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx!.getImageData(0, 0, 1, 1).data;
          const backgroundColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})`;

          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvasSize, canvasSize);
          ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const newFile = new File([blob], file.name, { type: 'image/png' });
              setImage({ img: newFile, path: null, type: 'ADD' });
            } else {
              Notification({ type: 'error', text: t('CreateCvNotificationAvatarUploadError') });
            }
          }, 'image/png');
        };

        img.onerror = () => {
          Notification({ type: 'error', text: t('CreateCvNotificationAvatarImageError') });
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = async (data: any) => {
    if (data.file) {
      const selectedImage = data.file.originFileObj;
      const isValid = await validateImage(selectedImage);
      if (isValid) {
        handleFileSelect(selectedImage);
      }
    }
  };

  const handleClearImage = () => {
    setImage({ img: null, path: null, type: 'DELETE' });
  };

  useEffect(() => {
    if (params.id !== null) {
      getUser();
    }
  }, [params]);

  return (
    <StyledActionForm>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="upload_wrapper">
          <div className="image-side">
            <Image
              rel="preload"
              loading="lazy"
              src={
                image?.img ? URL.createObjectURL(image.img) : image?.path ? routes.api.baseUrl + '/' + image.path : ''
              }
              fallback={defaultImageUrl}
              preview={false}
            />
            {(image?.img || image?.path) && (
              <button onClick={handleClearImage} className="delete-profile">
                <SvgSelector key="trash" id="trash" />
              </button>
            )}
          </div>
          <div>
            <div className="image-title">{t('profile_image')}</div>
            <div className="upload_settings">{t('upload_image_required_settings')}</div>
            <div className="upload">
              <Upload onChange={handleImageChange}>
                {image?.img || image?.path ? t('edit_image') : t('upload_image')}&nbsp;
                <UploadOutlined />
              </Upload>
            </div>
          </div>
        </div>
        <div className="flex">
          <Input
            rules={[
              { required: true, message: t('field_is_required') },
              {
                type: 'email',
                message: t('emailIsNotValid'),
              },
            ]}
            label={t('email')}
            placeholder="exaple@gmail.com"
            name="email"
            type="email"
          />

          <Input name="name" rules={[{ required: true, message: t('field_is_required') }]} label={t('name')} />
          <Input name="surname" rules={[{ required: true, message: t('field_is_required') }]} label={t('surname')} />
        </div>
        <div className="flex">
          <Input
            name="password"
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('password')}
            type="password"
          />
          <Input
            name="phoneNumber"
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('phone_number')}
          />
          <Select name="role" rules={[{ required: true, message: t('field_is_required') }]} label={t('role')}>
            {ROLE.map((item, index) => (
              <SelectOption value={item.id} key={index}>
                {t(item.text)}
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className="flex">
          <Select name="teamLeaderId" label={t('teams')}>
            {teams?.data?.map((item: { userId: number; fullName: string }, index: number) => (
              <SelectOption value={item.userId} key={index}>
                {item.fullName}
              </SelectOption>
            ))}
          </Select>
          <Select name="companyId" rules={[{ required: true, message: t('field_is_required') }]} label={t('company')}>
            {company?.data?.map((item: { companyId: number; companyName: string }, index: number) => (
              <SelectOption value={item.companyId} key={index}>
                {item.companyName}
              </SelectOption>
            ))}
          </Select>
          <Select
            loading={isCountryLoading}
            name="countryId"
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('country')}
          >
            {country?.data?.map((item: { id: number; name: string }, index: number) => (
              <SelectOption value={item.id} key={index}>
                {item.name}
              </SelectOption>
            ))}
          </Select>
        </div>

        <div className="action-button">
          <Button label={t('cancel')} onClick={() => navigate(-1)} type="default" className="cancel-button" />
          <Button label={t('create_user')} type="primary" htmlType="submit" />
        </div>
      </Form>
    </StyledActionForm>
  );
}
