import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColumnsType, TableLocale } from 'antd/lib/table/interface';
import { useNavigate } from 'react-router-dom';
import { Table as AntdTable } from 'antd';
import { FilterValue, Key, SortOrder, TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import { EmptyTable } from 'components';

export type TableFilterType = {
  pageIndex: number;
  pageSize: number;
  options?: any[];
  sortBy?: string;
  orderBy?: string;
  dateFrom?: string;
  dateTo?: string;
  email?: string;
  modules?: string;
  name?: string;
  surname?: string;
  pagesId?: number[];
};

export interface TableProps {
  locale?: TableLocale;
  loading?: boolean;
  rowKey?: string;
  saveData?: any;
  columns: ColumnsType<any>;
  dataSource?: object[];
  size?: 'small' | 'large' | 'middle';
  rowClassName?: any;
  onRow?: any;
  onChange?: any;
  disablePagination?: boolean;
  components?: any;
  scroll?: any;
  linkProps?: {
    url: string;
    recordKey?: string;
  };
  url?: string;
  filter?: TableFilterType;
  defaultSort?: string;
  enableSelectedRow?: boolean;
  reload?: number;
  setSelectedRows?: any;
  setSelectedKeys?: any;
  rowSelectionFunction?: TableRowSelection<any>;
  pagination?: TablePaginationConfig;
  refresh?: boolean;
  setRefresh?: Dispatch<SetStateAction<boolean>>;
  route?: string;
  className?: string;
}

interface SorterResult {
  order?: SortOrder;
  field?: string;
  columnKey?: Key;
}

export const Table = ({
  locale,
  loading,
  rowKey = 'id',
  columns,
  dataSource,
  size,
  rowClassName,
  saveData,
  onRow,
  onChange,
  disablePagination,
  components,
  scroll,
  linkProps,
  url,
  filter,
  defaultSort = '',
  enableSelectedRow,
  reload,
  setSelectedRows,
  setSelectedKeys,
  rowSelectionFunction,
  refresh,
  setRefresh,
  route,
  className,
}: TableProps) => {
  const [innerData, setInnerData] = useState<any>(dataSource || []);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setInnerData(dataSource);
  }, [dataSource]);

  if (!locale) {
    locale = {
      emptyText: t('general.found_no_data'),
      filterConfirm: t('general.filter'),
      filterReset: t('general.clear'),
    };
  }

  const updateSearchParams = (sortBy: any, orderBy: any) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (sortBy && orderBy) {
      searchParams.set('ColumnKey', sortBy);
      searchParams.set('Order', orderBy);
    } else {
      searchParams.delete('ColumnKey');
      searchParams.delete('Order');
    }

    navigate({
      pathname: window.location.pathname,
      search: searchParams.toString(),
    });
  };

  const parsedColumns = columns.map((col: any) => {
    if (components) {
      return { ...col };
    }

    return {
      ...col,
      onCell: (record: object) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const onTableChange = async (
    { current, pageSize }: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    { field, order }: SorterResult
  ) => {
    updateSearchParams(field, order);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object) => {
      setSelectedRows && setSelectedRows(selectedRows);
      setSelectedKeys && setSelectedKeys(selectedRowKeys);
    },
  };

  return (
    <>
      <AntdTable
        locale={{ emptyText: EmptyTable() }}
        loading={loading}
        rowKey={rowKey}
        columns={parsedColumns}
        dataSource={innerData}
        size={size}
        rowClassName={rowClassName}
        onRow={onRow}
        onChange={onChange || onTableChange}
        showSorterTooltip={false}
        pagination={false}
        tableLayout="fixed"
        rowSelection={enableSelectedRow ? rowSelectionFunction ?? rowSelection : undefined}
        className={className}
      />
    </>
  );
};
