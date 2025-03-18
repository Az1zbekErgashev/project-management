import React, { useEffect, useState } from 'react';
import { TranslationsList } from './components/TranslationsList';
import { StyledTranslation } from './styled';
import { TranslationsFilter } from './components/TranslationsFilter';
import { Button, ConfirmModal, Notification } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import { smoothScroll } from 'utils/globalFunctions';
import Pagination from 'ui/Pagination/Pagination';
import { TFunction } from 'i18next';

interface initalQuery {
  PageIndex: number;
  PageSize: number;
  Key?: string;
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
  confirmText: t(isDelete === 'DELETE' ? 'delete_translation' : 'recover_translation'),
  title: t(isDelete === 'DELETE' ? 'delete_translation_title' : 'recover_translation_title'),
  content: t(isDelete === 'DELETE' ? 'delete_translation_description' : 'recover_translation_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Translations() {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<initalQuery>({ PageIndex: 1, PageSize: 10 });
  const [key, setKey] = useState<string | null>(null);
  const [coniformModal, setConiformModal] = useState<any>(null);
  const { refetch: getTranslations, data: translations } = useQueryApiClient({
    request: {
      url: '/api/multilingualtext/all/translations',
      method: 'GET',
      data: queryParams,
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, PageIndex: page, PageSize: pageSize }));
  };

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      Key: changedValue.Key,
      IsDeleted: changedValue.IsDeleted,
    }));
  };

  useEffect(() => {
    getTranslations();
  }, [queryParams]);

  const handleDelete = (type: 'DELETE' | 'RECOVER', key: string) => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          setKey(key);
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const { refetch: deleteTranslation } = useQueryApiClient({
    request: {
      url: `/api/multilingualtext/delete?key=${key}`,
      method: 'DELETE',
    },
    onSuccess(res) {
      if (res.data === 'deleted') {
        Notification({ type: 'error', text: t('translation_deleted') });
      } else {
        Notification({ type: 'info', text: t('translation_recovered') });
      }
      getTranslations();
    },
  });

  useEffect(() => {
    if (key) {
      deleteTranslation();
      setConiformModal(null);
      setKey(null);
    }
  }, [key]);

  return (
    <StyledTranslation>
      <div className="header-line">
        <h1 className="global-title">{t('translations')}</h1>
        <Button label={t('add_translations')} type="primary" />
      </div>
      <TranslationsFilter handleFilterChange={handleFilterChange} />
      <TranslationsList handleDelete={handleDelete} translations={translations?.data?.items} />
      {translations?.data?.totalPages > 1 && (
        <Pagination
          total={translations?.data?.totalItems}
          pageSize={translations?.data?.itemsPerPage}
          onChange={handlePaginationChange}
          hideOnSinglePage={true}
          current={translations?.data?.PageIndex}
        />
      )}
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledTranslation>
  );
}
