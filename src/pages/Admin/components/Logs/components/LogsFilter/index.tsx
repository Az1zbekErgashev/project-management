import React, { useTransition } from 'react';
import { StyledLogsFilter } from './style';
import { Form } from 'antd';
import { Button, DatePicker, Input, Select, SelectOption } from 'ui';
import { actions } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/es/form/Form';

interface props {
  handleFilterChange: any;
  resetFileds: () => void;
}

export function LogsFilter({ handleFilterChange, resetFileds }: props) {
  const { t } = useTranslation();
  const [form] = useForm();
  const { data: emails, isLoading } = useQueryApiClient({
    request: {
      url: '/api/user/user-email',
      method: 'GET',
    },
  });
  return (
    <StyledLogsFilter>
      <Form form={form} onValuesChange={handleFilterChange} layout="vertical">
        <Input label={t('email_name_surname')} name="text" />
        <Select label={t('email')} loading={isLoading} name="userId">
          {emails?.data?.map((item: any, index: number) => (
            <SelectOption key={index} value={item.id}>
              {item.email}
            </SelectOption>
          ))}
        </Select>
        <Select label={t('action')} name="action">
          {actions?.map((item, index) => (
            <SelectOption value={item.id} key={index}>
              {t(item.text)}
            </SelectOption>
          ))}
        </Select>
        <DatePicker label={t('start_date')} name="startDate" placeholder={t('select_date')} />
        <DatePicker label={t('end_date')} name="endDate" placeholder={t('select_date')} />
        {(form.getFieldValue('text') ||
          form.getFieldValue('startDate') ||
          form.getFieldValue('endDate') ||
          form.getFieldValue('action') ||
          form.getFieldValue('userId')) && (
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
    </StyledLogsFilter>
  );
}
