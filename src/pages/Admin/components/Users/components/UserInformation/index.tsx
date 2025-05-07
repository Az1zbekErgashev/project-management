import { Form, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, DatePicker, Input, Notification, Select, SelectOption, Upload } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledActionForm } from './style';
import { ROLE } from 'utils/consts';
import { UploadOutlined } from '@ant-design/icons';
import { defaultImageUrl } from 'utils/consts';
import { routes } from 'config/config';
import SvgSelector from 'assets/icons/SvgSelector';
import { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import { useUser } from 'hooks/useUserState';

interface props {
  open: { type: 'VIEW' | 'ADD' | 'EDIT'; user: any };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      type: 'VIEW' | 'ADD' | 'EDIT';
      user: any;
    }>
  >;
  onClose: () => void;
  form: FormInstance;
  handleDelete: (id: number, type: 'DELETE' | 'RECOVER' | 'HARD') => void;
  getUsers: () => void;
}

export function UserInformation({ open, setOpen, onClose, form, handleDelete, getUsers }: props) {
  const [image, setImage] = useState<{ img: File | null; path: string | null; type: 'ADD' | 'DELETE' }>();
  const { t } = useTranslation();
  const { user } = useUser();
  const [passwordStatus, setPasswordStatus] = useState(false);

  const [disable, setDisable] = useState<boolean>(false);

  const { appendData: createuser } = useQueryApiClient({
    request: {
      url: '/api/user/create-new-user',
      method: 'POST',
      multipart: true,
    },
    onSuccess() {
      Notification({ text: t('user_created_success'), type: 'success' });
      getUsers();
      onClose();
    },
  });

  const { appendData: updateuser } = useQueryApiClient({
    request: {
      url: '/api/user/update',
      method: 'PATCH',
      multipart: true,
    },
    onSuccess() {
      Notification({ text: t('user_updated_success'), type: 'success' });
      getUsers();
      onClose();
    },
    onError(error) {
      if (error?.data?.error) Notification({ text: t('cannot_change_last_admin'), type: 'error' });
    },
  });

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
    if (open.type == 'VIEW') {
      setDisable(true);
      form.setFieldsValue({
        ...open.user,
        countryId: open?.user?.country?.id,
        dateOfBirth: open?.user?.dateOfBirth && dayjs(open.user.dateOfBirth),
        role: open?.user?.roleId,
      });
      setImage({ img: null, path: open?.user?.image?.path, type: 'ADD' });
    } else {
      setDisable(false);
    }
  }, [open]);

  const handleDeleteUser = (type?: string) => {
    if (type === 'HARD') {
      handleDelete(open?.user?.id, 'HARD');
    } else if (open.user.isDeleted === 0) {
      handleDelete(open?.user?.id, 'DELETE');
    } else {
      handleDelete(open?.user?.id, 'RECOVER');
    }
  };

  const handleUpdate = () => {
    setOpen((prev: { type: 'VIEW' | 'ADD' | 'EDIT'; user: any }) => ({
      ...prev,
      type: 'EDIT',
      user: prev.user,
    }));
    setDisable(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((res) => {
        if (open.type === 'ADD') {
          res.image = image?.img;
          res.DateOfBirth = res.dateOfBirth !== null ? dayjs(res.dateOfBirth) : null;
          createuser(res);
        } else {
          res.UpdateImage = image?.img === null ? false : true;
          res.image = image?.img === null ? false : image?.img;
          res.UserId = open?.user?.id;
          res.DateOfBirth = res.dateOfBirth !== null ? dayjs(res.dateOfBirth) : null;
          updateuser(res);
        }
      })
      .catch(() => {
        return;
      });
  };

  return (
    <StyledActionForm>
      <Form layout="vertical" form={form}>
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

          {open.type == 'VIEW' && (
            <div>
              <Button icon={<SvgSelector id="edit" />} onClick={handleUpdate} />
            </div>
          )}
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
            disabled={disable}
          />

          <Input
            name="name"
            disabled={disable}
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('name')}
          />
        </div>
        <div className="flex">
          <Input
            name="surname"
            disabled={disable}
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('surname')}
          />
          <div className="password-item">
            <Input
              name="password"
              rules={[{ required: open.type == 'EDIT' ? passwordStatus : true, message: t('field_is_required') }]}
              label={t('password')}
              type="password"
              disabled={open.type == 'VIEW' || open.type == 'EDIT' ? !passwordStatus : false}
            />
            {open.type == 'EDIT' && (
              <div>
                <Checkbox
                  label={t('update_password')}
                  checked={passwordStatus}
                  onChange={() => setPasswordStatus(!passwordStatus)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <Input
            name="phoneNumber"
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('phone_number')}
            disabled={disable}
          />
          <Select
            disabled={disable}
            name="role"
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('role')}
          >
            {ROLE.map((item, index) => (
              <SelectOption value={item.id} key={index}>
                {t(item.text)}
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className="flex">
          <Select
            loading={isCountryLoading}
            name="countryId"
            rules={[{ required: true, message: t('field_is_required') }]}
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

        <div className="action-button">
          {open.type !== 'VIEW' ? (
            <Button label={t('cancel')} onClick={onClose} type="default" className="cancel-button" />
          ) : (
            <>
              <Button label={t('cancel')} onClick={onClose} type="default" className="cancel-button" />
              {user.id != open?.user?.id && (
                <>
                  <Button
                    danger
                    label={open?.user?.isDeleted === 0 ? t('delete') : t('recover')}
                    onClick={() => handleDeleteUser()}
                    className={open?.user?.isDeleted === 0 ? 'delete-button' : 'recover-button'}
                    type="primary"
                  />
                  <Button
                    danger
                    label={t('hard_delete')}
                    onClick={() => handleDeleteUser('HARD')}
                    className={open?.user?.isDeleted === 0 ? 'delete-button' : 'recover-button'}
                    type="primary"
                  />
                </>
              )}
            </>
          )}
          {open.type !== 'VIEW' && (
            <Button
              label={open.type === 'ADD' ? t('create_user') : t('save_changes')}
              type="primary"
              htmlType="button"
              onClick={handleSubmit}
            />
          )}
        </div>
      </Form>
    </StyledActionForm>
  );
}
