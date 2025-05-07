import React from 'react';
import { StyledUsersFilter } from './style';
import { Form } from 'antd';
import { Button, Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import { ROLE } from 'utils/consts';

interface props {
  handleFilterChange: (changedValue: any) => void;
  resetFileds: () => void;
}

export default function UsersFilter({ handleFilterChange, resetFileds }: props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  return (
    <StyledUsersFilter>
      <Form form={form} layout="vertical" onValuesChange={handleFilterChange}>
        <Input label={t('email_name_surname')} name="Text" />
        <Select label={t('role')} name="Role">
          {ROLE.map((item, index) => (
            <SelectOption value={item.id.toString()} key={index}>
              {t(item.text)}
            </SelectOption>
          ))}
        </Select>
        <Select name="IsDeleted" label={t('status')}>
          <SelectOption value={'1'}>{t('deleted')}</SelectOption>
          <SelectOption value={'0'}>{t('active')}</SelectOption>
        </Select>
        {(form.getFieldValue('Text') || form.getFieldValue('Role') || form.getFieldValue('IsDeleted')) && (
          <div className="clear_btn">
            <Button
              className="btn"
              label={t('clear_filter')}
              type="primary"
              onClick={() => {
                form.resetFields();
                resetFileds();
              }}
            />
          </div>
        )}
      </Form>
    </StyledUsersFilter>
  );
}
