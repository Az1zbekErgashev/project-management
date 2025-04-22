import React, { useState } from 'react';
import { Button, Input, Tabs, List, Card, Space, Typography, Divider, Upload, Table, Tooltip, TableColumnsType } from 'antd';
import { SendOutlined, FileTextOutlined, HistoryOutlined, UploadOutlined, TableOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styled from 'styled-components';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const t = (key: string) => key;

const NotesButton = styled.span`
  color: #1890ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PROJECT_STATUS = [
  { text: 'Pending' },
  { text: 'Completed' },
  { text: 'In Progress' }
];

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

interface Change {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  author: string;
  timestamp: Date;
  file?: File;
}

interface Inquiry {
  id: string;
  date: string;
  updatedAt: string;
  inquiryType: string;
  companyName: string;
  department: string;
  responsiblePerson: string;
  inquiryField: string;
  clientCompany: string;
  projectDetails: string;
  client: string;
  contactNumber: string;
  email: string;
  finalResult: string;
  notes: string;
  status: string;
}

const CommentsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    updatedAt: '',
    inquiryType: '',
    companyName: '',
    department: '',
    responsiblePerson: '',
    inquiryField: '',
    clientCompany: '',
    projectDetails: '',
    client: '',
    contactNumber: '',
    email: '',
    finalResult: '',
    notes: '',
    status: ''
  });
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'Everything looks good, ready to approve!',
      author: 'Anna Stepanova',
      timestamp: new Date('2025-04-20T10:30:00')
    }
  ]);
  const [changes, setChanges] = useState<Change[]>([
    {
      id: '1',
      field: 'department',
      oldValue: '',
      newValue: 'Changed department',
      author: 'Ivan Petrov',
      timestamp: new Date('2025-04-20T10:00:00'),
      file: new File(['dummy content'], 'document.pdf', { type: 'application/pdf' })
    },
    {
      id: '2',
      field: 'inquiryType',
      oldValue: '',
      newValue: 'New description',
      author: 'Anna Stepanova',
      timestamp: new Date('2025-04-20T10:15:00')
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inquiries: Inquiry[] = [
    {
      id: '1',
      date: '20/04/2025',
      updatedAt: '2025-04-20 11:00',
      inquiryType: 'Type A',
      companyName: 'Company X',
      department: 'IT',
      responsiblePerson: 'John Doe',
      inquiryField: 'Tech',
      clientCompany: 'Client Y',
      projectDetails: 'Project details here',
      client: 'Jane Smith',
      contactNumber: '+1234567890',
      email: 'client@company.com',
      finalResult: 'Success',
      notes: 'This is a very long note that exceeds 30 characters and should be shown in a tooltip.',
      status: 'Completed'
    },
    {
      id: '2',
      date: '21/04/2025',
      updatedAt: '2025-04-21 09:00',
      inquiryType: 'Type B',
      companyName: 'Company Z',
      department: 'HR',
      responsiblePerson: 'Alice Brown',
      inquiryField: 'HR',
      clientCompany: 'Client W',
      projectDetails: 'Another project',
      client: 'Bob Johnson',
      contactNumber: '+0987654321',
      email: 'bob@client.com',
      finalResult: 'Pending',
      notes: 'Short note',
      status: 'Pending'
    }
  ];

  // Mock pagination data (replace with your actual pagination logic)
  const requests = {
    pageIndex: 1,
    itemsPerPage: 10
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const oldValue = formData[name as keyof typeof formData];
    if (oldValue !== value) {
      setChanges(prev => [...prev, {
        id: crypto.randomUUID(),
        field: name,
        oldValue,
        newValue: value,
        author: 'Current User',
        timestamp: new Date(),
        file: selectedFile || undefined
      }]);
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments(prev => [...prev, {
        id: crypto.randomUUID(),
        text: newComment,
        author: 'Current User',
        timestamp: new Date()
      }]);
      setNewComment('');
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj as File;
    if (file) {
      setSelectedFile(file);
    }
  };

  const columns: TableColumnsType<Inquiry> = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_: any, record: Inquiry, index: number) => (
        <div>{(requests?.pageIndex - 1) * requests?.itemsPerPage + index + 1}</div>
      ),
      fixed: 'left' as const,
    },
    {
      title: t('createdAt'),
      dataIndex: 'date',
      key: 'date',
      fixed: 'left' as const,
      render: (date: string) => {
        if (!date) return '-';
        const parsedDate = dayjs(date, 'DD/MM/YYYY');
        return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : date;
      },
    },
    {
      title: t('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      fixed: 'left' as const,
    },
    {
      title: t('inquiry_type'),
      dataIndex: 'inquiryType',
      key: 'inquiryType',
      fixed: 'left' as const,
    },
    {
      title: t('company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      fixed: 'left' as const,
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
      fixed: 'left' as const,
    },
    {
      title: t('responsible_person'),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
    },
    {
      title: t('inquiry_field'),
      dataIndex: 'inquiryField',
      key: 'inquiryField',
    },
    {
      title: t('client_company'),
      dataIndex: 'clientCompany',
      key: 'clientCompany',
    },
    {
      title: t('project_details'),
      dataIndex: 'projectDetails',
      key: 'projectDetails',
    },
    {
      title: t('client'),
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: t('contact_number'),
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('final_result'),
      dataIndex: 'finalResult',
      key: 'finalResult',
    },
    {
      title: t('notes'),
      dataIndex: 'notes',
      key: 'notes',
      width: 120,
      render: (text: string) => {
        const isLongText = text && text.length > 30;
        return isLongText ? (
          <Tooltip
            title={text}
            placement="top"
            overlayStyle={{ maxWidth: '200px' }}
            overlayInnerStyle={{
              backgroundColor: 'rgba(15, 10, 10, 0.85)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '4px',
            }}
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            trigger={['hover']}
            destroyTooltipOnHide
          >
            <NotesButton>{t('view_notes')}</NotesButton>
          </Tooltip>
        ) : (
          <span>{text || '-'}</span>
        );
      },
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: Inquiry) =>
        PROJECT_STATUS?.map((item, index) => {
          if (item?.text?.toLowerCase() === record?.status?.toLowerCase())
            return <React.Fragment key={index}>{t(item.text)}</React.Fragment>;
          return null;
        }),
    },
  ];

  const formFields = [
    { name: 'date', label: t('createdAt') },
    { name: 'updatedAt', label: t('updatedAt') },
    { name: 'inquiryType', label: t('inquiry_type') },
    { name: 'companyName', label: t('company_name') },
    { name: 'department', label: t('department') },
    { name: 'responsiblePerson', label: t('responsible_person') },
    { name: 'inquiryField', label: t('inquiry_field') },
    { name: 'clientCompany', label: t('client_company') },
    { name: 'projectDetails', label: t('project_details') },
    { name: 'client', label: t('client') },
    { name: 'contactNumber', label: t('contact_number') },
    { name: 'email', label: t('email') },
    { name: 'finalResult', label: t('final_result') },
    { name: 'notes', label: t('notes') },
    { name: 'status', label: t('status') },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={4}>Data Form</Title>
      <Card style={{ marginBottom: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {formFields.map((field) => (
              <div key={field.name}>
                <Text strong>{field.label}</Text>
                <Input
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  style={{ marginTop: '8px' }}
                />
              </div>
            ))}
          </div>
          <div>
            <Text strong>Attach File</Text>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
              style={{ marginTop: '8px' }}
            >
              <Button icon={<UploadOutlined />} style={{ marginTop: '8px' }}>
                Select File
              </Button>
            </Upload>
            {selectedFile && (
              <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
                Selected: {selectedFile.name}
              </Text>
            )}
          </div>
        </Space>
      </Card>

      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <SendOutlined /> Comments section
            </span>
          }
          key="1"
        >
          <Title level={4}>Comments</Title>
          <List
            dataSource={comments}
            renderItem={item => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>{item.author}</Text>
                    <Text type="secondary">{dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}</Text>
                    <Text>{item.text}</Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          <Divider />
          <Space style={{ width: '100%' }}>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter a comment"
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleCommentSubmit}
            >
              Submit
            </Button>
          </Space>
        </TabPane>
        <TabPane
          tab={
            <span>
              <HistoryOutlined /> Change History
            </span>
          }
          key="2"
        >
          <Title level={4}>Change History</Title>
          <List
            dataSource={changes}
            renderItem={item => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>{item.author}</Text>
                    <Text type="secondary">{dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}</Text>
                    <Text>Changed {item.field.toLowerCase()}: "{item.oldValue}" → "{item.newValue}"</Text>
                    {item.file && (
                      <Text style={{ color: '#1890ff', cursor: 'pointer' }}>
                        {item.file.name}
                      </Text>
                    )}
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <TableOutlined /> Inquiries
            </span>
          }
          key="3"
        >
          <Title level={4}>Inquiries</Title>
          <Table
            columns={columns}
            dataSource={inquiries}
            rowKey="id"
            scroll={{ x: 1500 }}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CommentsPage;