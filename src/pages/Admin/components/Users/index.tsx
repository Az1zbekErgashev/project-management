import React, { useEffect, useState } from 'react';
import { StyledAdminUsers } from './style';
import { Button, ConfirmModal, Notification, Table } from 'ui';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import UsersFilter from './components/UsersFilter';
import Pagination from 'ui/Pagination/Pagination';
import { smoothScroll } from 'utils/globalFunctions';
import { TFunction } from 'i18next';
import { Drawer, Form } from 'antd';
import { UserInformation } from './components/UserInformation';

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
  const [open, setOpen] = useState<{ open: boolean; type: 'VIEW' | 'ADD' | 'EDIT'; user: any }>({
    open: false,
    type: 'ADD',
    user: null,
  });
  const [form] = Form.useForm();

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
        Notification({ type: 'error', text: t('user_deleted') });
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
      onClose();
      setConiformModal(null);
    }
  }, [userId]);

  const column: ColumnsType<any> = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (_, record, index) => <div>{(users?.data?.pageIndex - 1) * users?.data?.itemsPerPage + index + 1}</div>,
    },
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
      width: 250,
      render: (item, record) => (
        <button
          style={{ cursor: 'pointer', backgroundColor: '#B0EBB4',  padding: '4px', borderRadius: '5px' }}
          onClick={() => showDrawer('VIEW', record)}
          className="email-row"
        >
          {item}
        </button>
      ),
    },
    {
      title: t('dateOfBirth'),
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (value, record) => value && dayjs(value).format('DD.MM.YYYY'),
    },
    { title: t('role'), dataIndex: 'role', key: 'role' },
    { title: t('name'), dataIndex: 'name', key: 'name' },
    { title: t('surname'), dataIndex: 'surname', key: 'surname' },
    { title: t('phone_number'), dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: t('country'), dataIndex: ['country', 'name'], key: 'country' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (item, record) => (record.isDeleted === 0 ? t('active') : t('deleted')),
    },
  ];

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
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

  useEffect(() => {
    getUsers();
  }, [queryParams]);

  const showDrawer = (type: 'ADD' | 'VIEW', record: any) => {
    if (type === 'ADD') setOpen({ open: true, type: type, user: null });
    else setOpen({ open: true, type: type, user: record });
  };

  const onClose = () => {
    form.resetFields();
    setOpen({ open: false, type: 'VIEW', user: null });
  };

  return (
    <StyledAdminUsers>
      <div className="header-line">
        <h1 className="global-title">{t('manage_users')}</h1>
        <Button label={t('add_user')} type="primary" onClick={() => showDrawer('ADD', null)} />
      </div>
      <UsersFilter handleFilterChange={handleFilterChange} />
      <Table columns={column} dataSource={users?.data?.items ?? []} />
      {users?.data?.totalPages > 1 && (
        <Pagination
          total={users?.data?.totalItems}
          pageSize={users?.data?.itemsPerPage}
          onChange={handlePaginationChange}
          hideOnSinglePage={true}
          current={users?.data?.PageIndex}
        />
      )}

      {coniformModal && <ConfirmModal {...coniformModal} />}
      <Drawer width={600} title={t('user-action')} onClose={onClose} open={open.open}>
        <UserInformation
          getUsers={getUsers}
          handleDelete={handleDelete}
          form={form}
          onClose={onClose}
          open={open}
          setOpen={setOpen}
        />
      </Drawer>
    </StyledAdminUsers>
  );
}
