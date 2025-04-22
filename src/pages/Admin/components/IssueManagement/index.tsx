
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useForm } from 'antd/es/form/Form';
import { StyledIssueManagement, PriorityBadge } from './style';
import { PRIORITY, PROJECT_STATUS } from 'utils/consts';

interface IssueModel {
  id: string;
  title: string;
  project: string;
  issueType: string;
  issueStatus: string;
  importance: string;
  priority: string;
  manager: string;
  registrant: string;
  registrationDate: string;
  endDate: string;
  lastUpdateDate: string;
}

interface Props {
  onIssueSelected?: (issue: IssueModel) => void;
}

const ISSUE_TYPES = [
  { id: 'bug', text: 'Bug' },
  { id: 'feature', text: 'Feature' },
  { id: 'task', text: 'Task' },
];

const IMPORTANCE_LEVELS = [
  { id: 'low', text: 'Low' },
  { id: 'medium', text: 'Medium' },
  { id: 'high', text: 'High' },
  { id: 'critical', text: 'Critical' },
];

const MANAGERS = [
  { id: 'manager1', text: 'Manager 1' },
  { id: 'manager2', text: 'Manager 2' },
  { id: 'manager3', text: 'Manager 3' },
];

const PROJECTS = [
  { id: 'project1', text: 'Issue Management Project' },
  { id: 'project2', text: 'Project 2' },
  { id: 'project3', text: 'Project 3' },
];

function IssueManagement({ onIssueSelected }: Props) {
  const { t } = useTranslation();
  const [form] = useForm();
  const [filters, setFilters] = useState<any>({});

  const { data: issues, isLoading } = useQueryApiClient({
    request: {
      url: '/api/issues',
      method: 'GET',
      disableOnMount: false,
    },
  });

  const filteredIssues = (issues?.data || []).filter((issue: IssueModel) => {
    return (
      (!filters.title || issue.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.project || issue.project === filters.project) &&
      (!filters.issueType || issue.issueType === filters.issueType) &&
      (!filters.issueStatus || issue.issueStatus === filters.issueStatus) &&
      (!filters.importance || issue.importance === filters.importance) &&
      (!filters.priority || issue.priority === filters.priority) &&
      (!filters.manager || issue.manager === filters.manager) &&
      (!filters.registrant || issue.registrant === filters.registrant) &&
      (!filters.registrationDate || issue.registrationDate === filters.registrationDate) &&
      (!filters.endDate || issue.endDate === filters.endDate)
    );
  });

  const handleSearch = (values: any) => {
    setFilters(values);
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({});
  };

  const columns: ColumnsType<IssueModel> = [
    {
      title: t('issue_title'),
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{text}</span>,
    },
    {
      title: t('priority'),
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const color = priority === 'High' ? '#ff4d4f' : priority === 'Medium' ? '#1890ff' : '#52c41a';
        return (
          <PriorityBadge style={{ backgroundColor: color, border: 'none', color: '#fff' }}>
            {t(priority)}
          </PriorityBadge>
        );
      },
    },
    {
      title: t('importance'),
      dataIndex: 'importance',
      key: 'importance',
      render: (importance) => <span>{t(importance)}</span>,
    },
    {
      title: t('issue_type'),
      dataIndex: 'issueType',
      key: 'issueType',
      render: (issueType) => <span>{t(issueType)}</span>,
    },
    {
      title: t('manager'),
      dataIndex: 'manager',
      key: 'manager',
      render: (manager) => <span>{manager}</span>,
    },
    {
      title: t('last_update_date'),
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
      render: (date) => <span>{date}</span>,
    },
  ];

  return (
    <StyledIssueManagement>
      <div className="header">
        <div className="title">{t('issue_management')}</div>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSearch}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <Form.Item label={t('enter_issue_name')} name="title">
                <Input placeholder={t('selected_search_criteria')} allowClear className="custom-input" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('detailed_search')}>
                <Button type="link">{t('detailed_search')}</Button>
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Form.Item label={t('project')} name="project">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {PROJECTS.map((proj) => (
                    <Select.Option key={proj.id} value={proj.id}>
                      {t(proj.text)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('issue_type')} name="issueType">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {ISSUE_TYPES.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {t(type.text)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('issue_status')} name="issueStatus">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {PROJECT_STATUS.map((status: { id: React.Key | null | undefined; text: any; }) => (
                    <Select.Option key={status.id} value={status.text}>
                      {t(status.text)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('issue_number')} name="id">
                <Input placeholder={t('select')} allowClear className="custom-input" />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Form.Item label={t('issue_content')} name="content">
                <Input placeholder={t('select')} allowClear className="custom-input" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('priority')} name="priority">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {PRIORITY.map((priority: { id: React.Key | null | undefined; text: any; }) => (
                    <Select.Option key={priority.id} value={priority.text}>
                      {t(priority.text)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('importance')} name="importance">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {IMPORTANCE_LEVELS.map((level) => (
                    <Select.Option key={level.id} value={level.id}>
                      {t(level.text)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('manager')} name="manager">
                <Select placeholder={t('select')} allowClear className="input-selection-select">
                  {MANAGERS.map((manager) => (
                    <Select.Option key={manager.id} value={manager.id}>
                      {manager.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Form.Item label={t('registrant')} name="registrant">
                <Input placeholder={t('select')} allowClear className="custom-input" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('registration_date')} name="registrationDate">
                <Input placeholder={t('select')} allowClear className="custom-input" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label={t('end_date')} name="endDate">
                <Input placeholder={t('select')} allowClear className="custom-input" />
              </Form.Item>
            </div>
            <div className="button-group">
              <Button type="primary" htmlType="submit" className="search-button">
                <span className="mr-2">🔍</span> {t('search')}
              </Button>
              <Button className="reset-button" onClick={handleReset}>
                <span className="mr-2">⟳</span> {t('reset')}
              </Button>
            </div>
          </div>
        </div>
      </Form>

      <Table
        columns={columns}
        dataSource={filteredIssues}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        loading={isLoading}
      />
    </StyledIssueManagement>
  );
}

export default IssueManagement;
