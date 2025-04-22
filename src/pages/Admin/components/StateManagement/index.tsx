
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Button, Table, Modal, Tag, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SelectOption } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useForm } from 'antd/es/form/Form';
import { StateBadge, ColorDot, StyledStateManagement } from './style';

interface StateModel {
  issueStatus: string;
  stateProperty: string;
  color: string;
  workflow: string[];
}

interface Props {
  onStateCreated?: () => void;
}

const STATE_PROPERTIES = [
  { value: 'atmosphere', label: 'Atmosphere' },
  { value: 'progress', label: 'Progress' },
  { value: 'end', label: 'End' },
];

export default function StateManagement({ onStateCreated }: Props) {
  const { t } = useTranslation();
  const [form] = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [stateProperty, setStateProperty] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const { data: states, refetch } = useQueryApiClient({
    request: {
      url: '/api/states',
      method: 'GET',
      disableOnMount: false,
    },
  });

  const { appendData: createState, isLoading: createLoading } = useQueryApiClient({
    request: {
      url: '/api/states/create',
      method: 'POST',
      disableOnMount: true,
    },
    onSuccess: () => {
      notification.success({
        message: t('success'),
        description: t('state_created_successfully'),
      });
      setCreateModalVisible(false);
      form.resetFields();
      refetch();
      onStateCreated?.();
    },
    onError: (error) => {
      notification.error({
        message: t('error'),
        description: error.message || t('state_creation_failed'),
      });
    },
  });

  const filteredStates = (states?.data || []).filter(
    (state: StateModel) =>
      state.issueStatus.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (stateProperty === '' || state.stateProperty === stateProperty)
  );

  const handleReset = () => {
    setSearchTerm('');
    setStateProperty('');
    form.resetFields();
  };

  const handleCreateSubmit = (values: any) => {
    createState({
      ...values,
      workflow: values.workflow.split(',').map((item: string) => item.trim()),
    });
  };

  const columns: ColumnsType<StateModel> = [
    {
      title: t('issue_status'),
      dataIndex: 'issueStatus',
      key: 'issueStatus',
      render: (text) => <span>{text}</span>,
    },
    {
      title: t('state_property'),
      dataIndex: 'stateProperty',
      key: 'stateProperty',
      render: (text, record) => (
        <StateBadge style={{ backgroundColor: record.color, border: 'none', color: '#fff' }}>
          {t(text)}
        </StateBadge>
      ),
    },
    {
      title: t('color'),
      dataIndex: 'color',
      key: 'color',
      render: (color) => <ColorDot style={{ backgroundColor: color }} />,
    },
    {
      title: t('workflow'),
      dataIndex: 'workflow',
      key: 'workflow',
      render: (workflow: string[]) => workflow.join(', '),
    },
  ];

  return (
    <StyledStateManagement>
      <div className="header">
        <div className="title">{t('state_management')}</div>
        <Button
          type="primary"
          onClick={() => setCreateModalVisible(true)}
          loading={createLoading}
        >
          {t('create_state')}
        </Button>
      </div>

      <Form form={form} layout="vertical" onValuesChange={(_, values) => setSearchTerm(values.searchTerm || '')}>
        <div className="form-row">
          <div className="form-group">
            <Form.Item label={t('issue_status_name')} name="searchTerm">
              <Input
                placeholder={t('enter_issue_status_name')}
                allowClear
                className="custom-input"
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item label={t('state_property')} name="stateProperty">
              <Select
                value={stateProperty}
                onChange={setStateProperty}
                placeholder={t('select_state_property')}
                allowClear
                className="input-selection-select"
              >
                <SelectOption value="">{t('select')}</SelectOption>
                {STATE_PROPERTIES.map((prop, index) => (
                  <SelectOption key={index} value={prop.value}>
                    {t(prop.label)}
                  </SelectOption>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="button-group">
            <Button type="primary" className="search-button">
              <span className="mr-2">🔍</span> {t('search')}
            </Button>
            <Button className="reset-button" onClick={handleReset}>
              <span className="mr-2">⟳</span> {t('reset')}
            </Button>
          </div>
        </div>
      </Form>

      <Table
        columns={columns}
        dataSource={filteredStates}
        rowKey={(record) => record.issueStatus}
        pagination={false}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
      />

      <Modal
        title={t('create_state')}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateSubmit}
          initialValues={{
            issueStatus: '',
            stateProperty: '',
            color: '#000000',
            workflow: '',
          }}
        >
          <Form.Item
            label={t('issue_status')}
            name="issueStatus"
            rules={[{ required: true, message: t('please_enter_issue_status') }]}
          >
            <Input placeholder={t('enter_issue_status')} className="custom-input" />
          </Form.Item>

          <Form.Item
            label={t('state_property')}
            name="stateProperty"
            rules={[{ required: true, message: t('please_select_state_property') }]}
          >
            <Select
              placeholder={t('select_state_property')}
              className="input-selection-select"
            >
              {STATE_PROPERTIES.map((prop, index) => (
                <SelectOption key={index} value={prop.value}>
                  {t(prop.label)}
                </SelectOption>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={t('color')}
            name="color"
            rules={[{ required: true, message: t('please_select_color') }]}
          >
            <Input type="color" className="custom-input" />
          </Form.Item>

          <Form.Item
            label={t('workflow')}
            name="workflow"
            rules={[{ required: true, message: t('please_enter_workflow') }]}
          >
            <Input placeholder={t('enter_workflow_comma_separated')} className="custom-input" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createLoading}
              className="submit-button"
            >
              {t('create')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledStateManagement>
  );
}
