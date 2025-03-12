import React, { useEffect, useState } from 'react';
import { StyledAdminUsers } from './style';
import { Button, ConfirmModal, Notification, Table } from 'ui';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import UsersFilter from './components/UsersFilter';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { TFunction } from 'i18next';
import { NavLink, useNavigate } from 'react-router-dom';

interface initalQuery {
  PageIndex: number;
  PageSize: number;
  Text?: string;
  TeamLeaderId?: number;
  CompanyId?: number;
  Role?: number;
  IsDeleted?: number;
}

const createModalConfig = (
  t: TFunction,
  isDelete: 'DELETE' | 'RECOVER',
  onConfirm: () => void,
  onCancel: () => void
) => ({
  isDelete,
  cancelText: t('cancel'),
  confirmText: t(isDelete === 'DELETE' ? 'delete_user' : 'recover_user'),
  title: t(isDelete === 'DELETE' ? 'delete_user_title' : 'recover_user_title'),
  content: t(isDelete === 'DELETE' ? 'delete_user_description' : 'recover_user_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function AdminUsers() {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<initalQuery>({ PageIndex: 1, PageSize: 10 });
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = (id: number, type: 'DELETE' | 'RECOVER') => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          setUserId(id);
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const { refetch: deleteUser } = useQueryApiClient({
    request: {
      url: `/api/user/delete?userId=${userId}`,
      method: 'DELETE',
    },
    onSuccess(response) {
      if (response.data === 'user_deleted') {
        Notification({ type: 'delete', text: t('user_deleted') });
      } else {
        Notification({ type: 'info', text: t('user_recovered') });
      }
      setConiformModal(null);
      getUsers();
    },
  });

  useEffect(() => {
    if (userId) {
      deleteUser();
      setUserId(null);
      setConiformModal(null);
    }
  }, [userId]);

  const column: ColumnsType<any> = [
    {
      title: t('last_update'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      render: (_, record) => record.updatedAt && dayjs(record.updatedAt).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (_, record) => record.createdAt && dayjs(record.createdAt).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      render: (item, record) => (
        <NavLink to={`/admin/user-information/${record.id}`} className="email-row">
          {item}
        </NavLink>
      ),
    },
    { title: t('company_name'), dataIndex: 'companyName', key: 'companyName' },
    { title: t('role'), dataIndex: 'role', key: 'role' },
    { title: t('name'), dataIndex: 'name', key: 'name' },
    { title: t('surname'), dataIndex: 'surname', key: 'surname' },
    { title: t('phone_number'), dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: t('country'), dataIndex: ['country', 'name'], key: 'country' },
  ];

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 95);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      CompanyId: changedValue.CompanyId,
      Role: changedValue.Role,
      TeamLeaderId: changedValue.TeamLeaderId,
      Text: changedValue.Text,
      IsDeleted: changedValue.IsDeleted,
    }));
  };

  const { data: users, refetch: getUsers } = useQueryApiClient({
    request: {
      url: '/api/user/filter',
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });

  const { data: company } = useQueryApiClient({
    request: {
      url: '/api/user/all-companys',
      method: 'GET',
    },
  });

  const { data: teams } = useQueryApiClient({
    request: {
      url: '/api/user/team-leaders',
      method: 'GET',
    },
  });

  useEffect(() => {
    getUsers();
  }, [queryParams]);

  return (
    <StyledAdminUsers>
      <div className="header-line">
        <h1 className="global-title">{t('manage_users')}</h1>
        <Button label={t('add_user')} type="primary" onClick={() => navigate('/admin/user-information')} />
      </div>
      <UsersFilter company={company} teams={teams} handleFilterChange={handleFilterChange} />
      <Table columns={column} dataSource={users?.data?.items ?? []} />
      <Pagination
        total={users?.data?.totalItems}
        pageSize={users?.data?.itemsPerPage}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
        current={users?.data?.PageIndex}
      />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledAdminUsers>
  );
}
