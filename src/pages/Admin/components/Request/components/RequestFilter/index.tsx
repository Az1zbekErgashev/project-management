import React from 'react';
import { StyledRequestFilter } from './style';
import { Form } from 'antd';
import { Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';

interface props {
  handleFilterChange: (value: any) => void;
  fieldsToShow?: string[];
  filterValue: any;
}

export function RequestFilter({ handleFilterChange, fieldsToShow, filterValue }: props) {
  const { t } = useTranslation();
  const isPendingRequests = window.location.pathname.includes('pending-request');

  return (
    <StyledRequestFilter>
      <Form layout="vertical" onValuesChange={handleFilterChange}>
        <Input className="input-selection" name="Text" label={t('text')} />
        {!isPendingRequests && (
          <Select className="input-selection" name="Category" modeType="FILTER" label={t('priority')}>
            {filterValue?.data?.map((item: any, index: number) => (
              <SelectOption key={index} value={item.id}>
                {item.title}
              </SelectOption>
            ))}
            <SelectOption value={null}>{t('all')}</SelectOption>
          </Select>
        )}
      </Form>
    </StyledRequestFilter>
  );
}
