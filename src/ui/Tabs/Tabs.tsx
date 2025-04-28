import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import { StyledTabs } from './style';

export interface TabsProps {
  type?: 'line' | 'card' | 'editable-card';
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  defaultActiveKey?: string;
  items?: any;
  children?: React.ReactNode;
  className?: string;
  animated?: any;
}

export const Tabs = ({ type, activeKey, onChange, defaultActiveKey, items, className, animated }: TabsProps) => {
  return (
    <StyledTabs className={className}>
      <AntdTabs
        type={type}
        activeKey={activeKey}
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
        items={items}
        animated={animated}
      />
    </StyledTabs>
  );
};
