import React, { useState } from 'react';
import { StyledProfileActionForm } from './style';
import { Input, Select, Upload, Notification, Checkbox, DatePicker, SelectOption } from 'ui';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import { defaultImageUrl } from 'utils/consts';
import SvgSelector from 'assets/icons/SvgSelector';
import { routes } from 'config/config';
import { UploadOutlined } from '@ant-design/icons';

interface props {
  actionForm: { type: 'VIEW' | 'EDIT' };
  setActionForm: React.Dispatch<
    React.SetStateAction<{
      type: 'VIEW' | 'EDIT';
    }>
  >;
  image: { img: File | null; path: string | null; type: 'ADD' | 'DELETE' } | undefined;
  setImage: React.Dispatch<
    React.SetStateAction<{ img: File | null; path: string | null; type: 'ADD' | 'DELETE' } | undefined>
  >;
  passwordStatus: boolean;
  setPasswordStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileActionForm({ image, setImage }: props) {
  const { t } = useTranslation();

  const [disable, setDisable] = useState<boolean>(false);

  const { data: country, isLoading: isCountryLoading } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const validateImage = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      Notification({ type: 'error', text: t('CreateCvNotificationAvatarType') });
      return false;
    }
    return true;
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
              setImage && setImage({ img: newFile, path: null, type: 'ADD' });
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
    setImage && setImage({ img: null, path: null, type: 'DELETE' });
  };
  return (
    <StyledProfileActionForm>
      <div className="left-layout">
        <div className="upload_wrapper">
          <div className="form-wrapper">
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
              {(image?.img || image?.path) && !disable && (
                <button onClick={handleClearImage} className="delete-profile">
                  <SvgSelector key="trash" id="trash" />
                </button>
              )}
            </div>
            <div>
              <div className="image-title">{t('profile_image')}</div>
              <div className="upload_settings">{t('upload_image_required_settings')}</div>
              <div className="upload">
                <Upload disabled={disable} onChange={handleImageChange}>
                  {image?.img || image?.path ? t('edit_image') : t('upload_image')}&nbsp;
                  <UploadOutlined />
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-layout">
        <div className="flex">
          <Input
            name="name"
            disabled={disable}
            rules={[{ required: false, message: t('field_is_required') }]}
            label={t('name')}
          />
          <Input
            rules={[
              { required: false, message: t('field_is_required') },
              {
                type: 'email',
                message: t('emailIsNotValid'),
              },
            ]}
            label={t('email')}
            placeholder="example@gmail.com"
            name="email"
            type="email"
            disabled={disable}
          />
        </div>
        <div className="flex">
          <Input
            name="surname"
            disabled={disable}
            rules={[{ required: false, message: t('field_is_required') }]}
            label={t('surname')}
          />
          <Input
            name="phoneNumber"
            rules={[{ required: false, message: t('field_is_required') }]}
            label={t('phone_number')}
            disabled={disable}
          />
        </div>
        <div className="flex">
          <Select
            loading={isCountryLoading}
            name="countryId"
            rules={[{ required: false, message: t('field_is_required') }]}
            label={t('country')}
            disabled={disable}
          >
            {country?.data?.map((item: { id: number; name: string }, index: number) => (
              <SelectOption value={item.id} key={index}>
                {item.name}
              </SelectOption>
            ))}
          </Select>
          <DatePicker disabled={disable} name="dateOfBirth" label={t('dateOfBirth')} />
        </div>
      </div>
    </StyledProfileActionForm>
  );
}
