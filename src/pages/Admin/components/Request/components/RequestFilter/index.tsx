import React, { useEffect, useState } from 'react';
import { StyledRequestFilter } from './style';
import { AutoComplete, Form } from 'antd';
import { Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';

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
      setFilteredOptions(response?.data);
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
            <Select className="input-selection-select" name="Category" modeType="FILTER" label={t('priority')}>
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
