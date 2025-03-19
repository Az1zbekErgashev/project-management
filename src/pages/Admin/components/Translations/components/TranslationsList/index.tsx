import SvgSelector from 'assets/icons/SvgSelector';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'ui';
import Tooltip from 'antd/lib/tooltip';

interface props {
  translations: any;
  handleDelete: (type: 'DELETE' | 'RECOVER', key: string) => void;
}
export function TranslationsList({ translations, handleDelete }: props) {
  const { t } = useTranslation();
  const column = [
    { title: t('key'), dataIndex: 'key', key: 'key' },
    { title: t('textKo'), dataIndex: 'textKo', key: 'textKo' },
    { title: t('textEn'), dataIndex: 'textEn', key: 'textEn' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (item: any, record: any) => <div>{record.isDeleted === 1 ? t('deleted') : t('active')}</div>,
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (item: any, record: any) => (
        <div className="actions">
          {record.isDeleted === 1 ? (
            <>
              <Tooltip
                color="#151a2d"
                style={{ color: 'white' }}
                placement="bottom"
                title={<span style={{ color: 'var(--white)' }}>{t('recover_translation_tooltip')}</span>}
                trigger={'hover'}
              >
                <Button onClick={() => handleDelete('RECOVER', record.key)} danger icon={<SvgSelector id="eye" />} />
              </Tooltip>
            </>
          ) : (
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              title={<span style={{ color: 'var(--white)' }}>{t('delete_translation_tooltip')}</span>}
              trigger={'hover'}
            >
              <Button onClick={() => handleDelete('DELETE', record.key)} danger icon={<SvgSelector id="eye-slash" />} />
            </Tooltip>
          )}

          <Tooltip
            color="#151a2d"
            style={{ color: 'white' }}
            placement="bottom"
            title={<span style={{ color: 'var(--white)' }}>{t('edit_translation_tooltip')}</span>}
            trigger={'hover'}
          >
            <Button icon={<SvgSelector id="edit" />} />
          </Tooltip>
        </div>
      ),
      width: 150,
    },
  ];
  return <Table dataSource={translations || []} columns={column} />;
}
