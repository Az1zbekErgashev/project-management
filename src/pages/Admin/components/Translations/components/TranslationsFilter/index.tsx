import { Form } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Select, SelectOption } from 'ui';

interface props {
  handleFilterChange: any;
}
export function TranslationsFilter({ handleFilterChange }: props) {
  const { t } = useTranslation();
  return (
    <Form onValuesChange={handleFilterChange} layout="vertical">
      <div className="filter-items">
        <Input name="Key" label={t('text')} />
        <Select name="IsDeleted" label={t('status')}>
          <SelectOption value={true}>{t('active')}</SelectOption>
          <SelectOption value={false}>{t('deleted')}</SelectOption>
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
      </div>
    </Form>
  );
}
