import React, { useTransition } from 'react';
import { StyledLogsFilter } from './style';
import { Form } from 'antd';
import { DatePicker, Input, Select, SelectOption } from 'ui';
import { actions } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useTranslation } from 'react-i18next';

interface props {
  handleFilterChange: any;
}

export function LogsFilter({ handleFilterChange }: props) {
  const { t } = useTranslation();
  const { data: emails, isLoading } = useQueryApiClient({
    request: {
      url: '/api/user/user-email',
      method: 'GET',
    },
  });
  return (
    <StyledLogsFilter>
      <Form onValuesChange={handleFilterChange} layout="vertical">
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
              {item.text}
            </SelectOption>
          ))}
        </Select>
        <DatePicker label={t('start_date')} name="startDate" />
        <DatePicker label={t('start_date')} name="endDate" />
      </Form>
    </StyledLogsFilter>
  );
}
