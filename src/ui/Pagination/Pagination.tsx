import React, { useEffect } from 'react';
import { Pagination as AntdPagination, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PaginationProps } from 'antd';
import { StyledPagination } from './style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Pagination = ({ current, pageSize, onChange, total, prevIcon, nextIcon }: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const queryPageIndex = queryParams.get('pageIndex');
  const queryPageSize = queryParams.get('pageSize');

  useEffect(() => {
    if (!queryPageIndex || !queryPageSize) {
      queryParams.set('pageIndex', '1');
      queryParams.set('pageSize', '10');
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
  }, [location.pathname, navigate, queryParams, queryPageIndex, queryPageSize]);

  const handlePageChange = (page: number, pageSize: number) => {
    if (queryPageIndex !== page.toString() || queryPageSize !== pageSize.toString()) {
      queryParams.set('pageIndex', page.toString());
      queryParams.set('pageSize', pageSize.toString());
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
    onChange && onChange(page, pageSize);
  };

  return (
    <StyledPagination>
      <div className="custom-pagination">
        <div className="pagination-page-size">
          <span>Show in page</span>
          <Select
            defaultValue={parseInt(queryPageSize || pageSize?.toString() || '10', 10)}
            value={parseInt(queryPageSize || pageSize?.toString() || '10', 10)}
            onChange={(value) => handlePageChange(1, value)}
            options={[10, 20, 30, 50].map((size) => ({ value: size, label: size }))}
          />
        </div>
        <AntdPagination
          current={parseInt(queryPageIndex || current?.toString() || '1', 10)}
          pageSize={parseInt(queryPageSize || pageSize?.toString() || '10', 10)}
          onChange={handlePageChange}
          total={total}
          showSizeChanger={false}
          prevIcon={
            <div className="pagination-btn">
              <LeftOutlined />
              &nbsp;
              {t('previous')}
            </div>
          }
          nextIcon={
            <div className="pagination-btn">
              {t('next')}&nbsp;
              <RightOutlined />
            </div>
          }
        />
      </div>
    </StyledPagination>
  );
};

export default Pagination;
