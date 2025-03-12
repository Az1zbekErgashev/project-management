import React from 'react';
import { StyledUsersFilter } from './style';
import { Form } from 'antd';
import { Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import { ROLE } from 'utils/consts';

interface props {
  teams: any;
  company: any;
  handleFilterChange: (changedValue: any) => void;
}

export default function UsersFilter({ company, teams, handleFilterChange }: props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  return (
    <StyledUsersFilter>
      <Form form={form} layout="vertical" onValuesChange={handleFilterChange}>
        <Input label={t('email_name_surname')} name="Text" />
        <Select label={t('role')} name="Role">
          {ROLE.map((item, index) => (
            <SelectOption value={item.id} key={index}>
              {t(item.text)}
            </SelectOption>
          ))}
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Select name="TeamLeaderId" label={t('teams')}>
          {teams?.data?.map((item: { id: number; fullName: string }, index: number) => (
            <SelectOption value={item.id} key={index}>
              {item.fullName}
            </SelectOption>
          ))}
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Select name="CompanyId" label={t('company')}>
          {company?.data?.map((item: { companyId: number; companyName: string }, index: number) => (
            <SelectOption value={item.companyId} key={index}>
              {item.companyName}
            </SelectOption>
          ))}
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Select name="IsDeleted" label={t('status')}>
          <SelectOption value={1}>{t('deleted')}</SelectOption>
          <SelectOption value={0}>{t('active')}</SelectOption>
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
      </Form>
    </StyledUsersFilter>
  );
}
