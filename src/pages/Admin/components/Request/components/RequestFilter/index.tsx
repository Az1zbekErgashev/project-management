import React, { useEffect, useState } from 'react';
import { StyledRequestFilter } from './style';
import { AutoComplete, Form } from 'antd';
import { Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { PROJECT_STATUS } from 'utils/consts';

interface props {
  handleFilterChange: (value: any) => void;
  isDeleted: number;
  filterValue: any;
  status?: number | null;
}
export function RequestFilter({ handleFilterChange, isDeleted = 0, filterValue, status = null }: props) {
  const { t } = useTranslation();
  const isPendingRequests = window.location.pathname.includes('pending-request');
  const [value, setValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const categoryId: string | null = searchParams.get('Category');
  const statusQuery: string | null = searchParams.get('Status');
  const priorty: string | null = searchParams.get('Priority');

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
      console.log('API Response:', response?.data);
      setFilteredOptions(response?.data.slice(0, 5));
    },
  });
  useEffect(() => {
    refetch();
  }, [window.location.pathname]);

  useEffect(() => {
    form.setFieldsValue({
      Category: categoryId ? parseInt(categoryId) : null,
      Status: statusQuery ? parseInt(statusQuery) : null,
      // Priority: priorty ? parseInt(priorty) : null,
    });
  }, [categoryId, statusQuery, priorty]);

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
          {!isPendingRequests && (
            <Select className="input-selection-select" name="Category" modeType="FILTER" label={t('category')}>
              {filterValue?.data?.map((item: any, index: number) => (
                <SelectOption key={index} value={item.id}>
                  {item.title}
                </SelectOption>
              ))}
              <SelectOption value={null}>{t('all')}</SelectOption>
            </Select>
          )}
          {/* {!isPendingRequests && (
            <Select className="input-selection-select" name="Priority" modeType="FILTER" label={t('priority')}>
              {PRIORITY?.map((item: any, index: number) => (
                <SelectOption key={index} value={item.id}>
                  {item.text}
                </SelectOption>
              ))}
              <SelectOption value={null}>{t('all')}</SelectOption>
            </Select>
          )} */}
          {!isPendingRequests && (
            <Select className="input-selection-select" name="Status" modeType="FILTER" label={t('status')}>
              {PROJECT_STATUS?.map((item: any, index: number) => (
                <SelectOption key={index} value={item.id}>
                  {item.text}
                </SelectOption>
              ))}
              <SelectOption value={null}>{t('all')}</SelectOption>
            </Select>
          )}
        </div>
      </Form>
    </StyledRequestFilter>
  );
}
