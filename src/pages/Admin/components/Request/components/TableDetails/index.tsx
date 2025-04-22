import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, List, Card, Space, Typography, Divider, Upload, Button as AntButton } from 'antd';
import { SendOutlined, FileTextOutlined, HistoryOutlined, UploadOutlined, TableOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { InputSelection } from '../InputSelection';
import { StyledTableDetail } from './style';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

// Mock Button component (replace with your actual Button from 'ui')
const Button = ({ label, type, onClick, className, icon }: { label: string; type: string; onClick: () => void; className?: string; icon?: React.ReactNode }) => (
  <AntButton type={type as any} onClick={onClick} className={className} icon={icon}>
    {label}
  </AntButton>
);

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

interface TableDetailProps {
  drawerStatus: {
    status: boolean;
    type: 'VIEW' | 'EDIT' | 'ADD';
    request?: RequestModel;
    sequence?: number;
  };
  setDrawerStatus: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      type: 'VIEW' | 'EDIT' | 'ADD';
      request?: RequestModel;
      sequence?: number;
    }>
  >;
  handleDelete: (id: number, type: 'DELETE' | 'RECOVER') => void;
  getRequests: () => void;
  form: any;
  onClose: () => void;
}

const TableDetail: React.FC<TableDetailProps> = ({
  drawerStatus,
  setDrawerStatus,
  handleDelete,
  getRequests,
  form,
  onClose,
}) => {
  const { t } = useTranslation();

  // State for comments, changes, and file uploads
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'Everything looks good, ready to approve!',
      author: 'Anna Stepanova',
      timestamp: new Date('2025-04-20T10:30:00'),
    },
  ]);
  const [changes, setChanges] = useState<Change[]>([
    {
      id: '1',
      field: 'department',
      oldValue: '',
      newValue: 'Changed department',
      author: 'Ivan Petrov',
      timestamp: new Date('2025-04-20T10:00:00'),
      file: new File(['dummy content'], 'document.pdf', { type: 'application/pdf' }),
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: newComment,
          author: 'Current User',
          timestamp: new Date(),
        },
      ]);
      setNewComment('');
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj as File;
    if (file) {
      setSelectedFile(file);
      // Log change with file
      setChanges(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          field: 'file',
          oldValue: '',
          newValue: 'File uploaded',
          author: 'Current User',
          timestamp: new Date(),
          file,
        },
      ]);
    }
  };

  return (
    <StyledTableDetail>
      <div className="table-detail">
        <div className="header">
          <h2 className="title">{t('request_action')}</h2>
          <Button
            label={t('close')}
            type="primary"
            onClick={onClose}
            className="close-button"
          />
        </div>
        <Form form={form} layout="vertical">
          <InputSelection
            setDrawerStatus={setDrawerStatus}
            handleDelete={handleDelete}
            drawerStatus={drawerStatus}
            getRequests={getRequests}
            form={form}
            onClose={onClose}
          />
        </Form>
        <br />
        {/* File Upload Section */}
        <div style={{ 
          marginTop: '16px', 
          marginLeft: '16px', 
          marginBottom: '16px', 
          paddingTop: '10px', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center',
          gap: '10px'
        }}>
          <Text strong>{t('attach_file')}</Text>
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            showUploadList={false}
            style={{ display: 'block' }}
          >
            <AntButton icon={<UploadOutlined />} type='primary'>
              {t('select_file')}
            </AntButton>
          </Upload>
          {selectedFile && (
            <Text type="secondary" style={{ display: 'block' }}>
              {t('selected')}: {selectedFile.name}
            </Text>
          )}
        </div>

        {/* Tabs for Comments, Change History, and Inquiries */}
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={
              <span style={{padding: '10px'}}> 
                <SendOutlined /> {t('comments')}
              </span>
            }
            key="1"
          >
            <Title level={4}>{t('comments')}</Title>
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
                placeholder={t('add_comment')}
                style={{ flex: 1 }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleCommentSubmit}
                label={t('submit')}
              />
            </Space>
          </TabPane>
          <TabPane style={{padding: '16px'}}
            tab={
              <span style={{padding: '10px'}}>
                <HistoryOutlined /> {t('change_history')}
              </span>
            }
            key="2"
          >
            <Title level={4}>{t('change_history')}</Title>
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
              <span style={{padding: '10px'}}>
                <TableOutlined /> {t('inquiries')}
              </span>
            }
            key="3"
          >
            <Title level={4}>{t('inquiries')}</Title>
            <Text>{t('no_inqueries_available')}</Text>
          </TabPane>
        </Tabs>
      </div>
    </StyledTableDetail>
  );
};

export default TableDetail;