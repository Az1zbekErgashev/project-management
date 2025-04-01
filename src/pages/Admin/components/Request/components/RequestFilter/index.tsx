import React, { useState } from 'react';
import { StyledRequestFilter } from './style';
import { Form } from 'antd';
import { DatePicker, Input, Select, SelectOption } from 'ui';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';

interface props {
  handleFilterChange: (value: any) => void;
  fieldsToShow?: string[];
}

export function RequestFilter({ handleFilterChange, fieldsToShow }: props) {
  const { t } = useTranslation();
  const isPendingRequests = window.location.pathname.includes('pending-request');

  const { data: filterValue } = useQueryApiClient({
    request: {
      url: '/api/request/filter-values',
      method: 'GET',
      data: {
        isDeleted: window.location.pathname.includes('deleted-request') ? 1 : 0,
        status: window.location.pathname.includes('pending-request') ? 0 : null,
      },
    },
  });

  return (
    <StyledRequestFilter>
      <Form layout="vertical" onValuesChange={handleFilterChange}>
        <Select className={"input-selection"} name="Date" mode="multiple" label={t('date')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'Date')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="InquiryType" mode="multiple" label={t('inquiry_type')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'InquiryType')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="CompanyName" mode="multiple" label={t('company_name')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'CompanyName')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="Department" mode="multiple" label={t('departament')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'Department')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="ResponsiblePerson" mode="multiple" label={t('responsible_person')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'ResponsiblePerson')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="InquiryField" mode="multiple" label={t('inquiry_field')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'InquiryField')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="ClientCompany" mode="multiple" label={t('client_company')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'ClientCompany')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="ProjectDetails" mode="multiple" label={t('project_details')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'ProjectDetails')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="Client" mode="multiple" label={t('client')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'Client')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="ContactNumber" mode="multiple" label={t('contact_number')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'ContactNumber')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="Email" mode="multiple" label={t('email')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'Email')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="ProcessingStatus" mode="multiple" label={t('processing_status')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'ProcessingStatus')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="FinalResult" mode="multiple" label={t('final_result')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'FinalResult')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>
        <Select className={"input-selection"} name="Notes" mode="multiple" label={t('notes')}>
          {filterValue?.data
            ?.filter((item: any) => item.value === 'Notes')
            .sort((a: any, b: any) => (a.text === 'Unknown' ? 1 : b.text === 'Unknown' ? -1 : 0))
            .map((item: any) => (
              <SelectOption key={item.value} value={item.text}>
                {item.text}
              </SelectOption>
            ))}
        </Select>

        <Input className={"input-selection"} name="Deadline" label={t('deadline')} />

        <Select className={"input-selection"} name="Status" mode="tags" modeType="FILTER" label={t('project_status')}>
          {PROJECT_STATUS.map((item, index) => {
            if (item.id != 0)
              return (
                <SelectOption key={index} value={item.id}>
                  {item.text}
                </SelectOption>
              );
          })}
        </Select>
        {!isPendingRequests && (
        <Select className="input-selection" name="Priority" mode="multiple" modeType="FILTER" label={t('priority')}>
          {PRIORITY.map((item, index) => (
            <SelectOption key={index} value={item.id}>
              {item.text}
            </SelectOption>
          ))}
        </Select>
)}
      </Form>
    </StyledRequestFilter>
  );
}
