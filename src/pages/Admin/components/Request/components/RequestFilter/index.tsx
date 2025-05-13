import React, { useEffect, useState } from 'react';
import { StyledRequestFilter } from './style';
import { AutoComplete, Form } from 'antd';
import { Button, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useForm } from 'antd/es/form/Form';
import { useSearchParams } from 'react-router-dom';

interface props {
  handleFilterChange: (value: any) => void;
  isDeleted: number;
  status?: number | null;
  categories: any;
  resetFileds: () => void;
}
export function RequestFilter({ handleFilterChange, isDeleted = 0, status = null, categories, resetFileds }: props) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [form] = useForm();
  const [searchParams, useSearchParam] = useSearchParams();
  const handleSearch = (searchText: string) => {
    const filtered = options?.data?.filter((option: { text: string }) =>
      option.text.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (data: string) => {
    setValue(data);
  };

  const { data: options, refetch } = useQueryApiClient({
    request: {
      url: '/api/request/filter-values',
      method: 'GET',
      data: { IsDeleted: isDeleted, Status: status },
      disableOnMount: true,
    },
    onSuccess(response) {
      setFilteredOptions(response?.data.slice(0, 5));
    },
  });
  useEffect(() => {
    refetch();
  }, [window.location.pathname]);

  useEffect(() => {
    form.setFieldsValue({
      Category: searchParams.get('Category'),
      Text: searchParams.get('Text'),
    });
  }, [searchParams]);

  return (
    <StyledRequestFilter>
      <Form form={form} layout="vertical" onValuesChange={handleFilterChange}>
        <Form.Item label={t('text')} name="Text">
          <AutoComplete
            value={value}
            onSelect={handleSelect}
            onSearch={handleSearch}
            onChange={setValue}
            placeholder={t('type_to_search')}
            allowClear
            className="custom-input"
            options={value ? filteredOptions.map((item: { text: string }) => ({ value: item.text })) : []}
          />
        </Form.Item>

        <div className="priory">
          <Select modeType="FILTER" className="input-selection-select" name="Category" label={t('category')}>
            {categories?.data?.map((item: any, index: number) => (
              <SelectOption key={index} value={item.id.toString()}>
                {item.title}
              </SelectOption>
            ))}
            <SelectOption value={null}>{t('all')}</SelectOption>
          </Select>
        </div>
        {(form.getFieldValue('Text') || form.getFieldValue('Category')) && (
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
    </StyledRequestFilter>
  );
}
