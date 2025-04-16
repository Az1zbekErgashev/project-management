import React, { useEffect, useState } from 'react';
import { StyledRequestFilter } from './style';
import { AutoComplete, Form } from 'antd';
import { Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useParams, useSearchParams } from 'react-router-dom';

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

  const [searchParams] = useSearchParams();
  const categoryId: string | null = searchParams.get('Category');

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

  return (
    <StyledRequestFilter>
      <Form layout="vertical" onValuesChange={handleFilterChange}>
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
            <Select
              className="input-selection-select"
              name="Category"
              modeType="FILTER"
              label={t('priority')}
              defaultValue={filterValue?.data?.find((item: any) => item.id === categoryId)?.title ?? null}
            >
              {filterValue?.data?.map((item: any, index: number) => (
                <SelectOption key={index} value={item.id}>
                  {item.title}
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
