import React, { useEffect, useState } from 'react';
import { Form, Input, Tabs, List, Card, Space, Typography, Divider, Upload, Button as AntButton, message } from 'antd';
import {
  SendOutlined,
  HistoryOutlined,
  UploadOutlined,
  TableOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { InputSelection } from '../InputSelection';
import { StyledTableDetail } from './style';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, Notification } from 'ui';
import axios from 'axios';
import useJwt from 'utils/useJwt';
import { get } from 'http';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const Button = ({
  label,
  type,
  onClick,
  className,
  icon,
}: {
  label: string;
  type: string;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}) => (
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
  user: any;
  log: string;
  id: string;
  timestamp: Date;
  file?: File;
}

export function TableDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { getHeader } = useJwt();
  const getToken = getHeader();
  const [actionStatus, setActionStatus] = useState<{ type: 'ADD' | 'VIEW' | 'EDIT'; request?: RequestModel } | null>(
    null
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const handleFetchClick = async () => {
    try {
      const response = await axios.get(`https://crm-api.wisestone-u.com/api/request/requets/${id}`, {
        headers: {
          Authorization: getToken,
        },
      });

      if (response.data) {
        form.setFieldsValue({
          ...response.data.data,
        });
        setActionStatus({ type: 'EDIT', request: { id, ...response.data.data } });
        console.log('Request data fetched successfully:', response.data.data);
      }
    } catch (error: any) {
      console.error('Error fetching request data:', error);
      console.error('Error details:', error.response?.data, error.message);
      message.error(t('failed_to_load_request'));
    }
  };

  const fetchComments = async () => {
    try {
      console.log('Fetching comments for RequestId:', id);
      const response = await axios.get('https://crm-api.wisestone-u.com/api/comment/comments', {
        headers: {
          Authorization: getToken,
        },
        params: {
          RequestId: parseInt(id || '0'),
          PageIndex: 1,
          PageSize: 10,
        },
      });

      console.log('GET /api/comment/comments full response: 123', response.data.data);
      console.log('GET /api/comment/comments data:', response.data);

      let fetchedComments: Comment[] = [];
      if (response.data && Array.isArray(response.data.data.items)) {
        fetchedComments = response.data.data.items.map((comment: any) => ({
          id: comment.id.toString(),
          text: comment.text,
          author: comment.user.name || 'Unknown',
          timestamp: new Date(comment.createdAt || Date.now()),
        }));
      } else if (response.data && Array.isArray(response.data)) {
        // Fallback: If response.data is the array directly
        fetchedComments = response.data.map((comment: any) => ({
          id: comment.id.toString(),
          text: comment.text,
          author: comment.author || 'Unknown',
          timestamp: new Date(comment.createdAt || Date.now()),
        }));
      } else {
        console.warn('No comments found or invalid data structure:', response.data);
      }

      setComments(fetchedComments);
      console.log('Fetched comments:', fetchedComments);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      console.error('Error details:', error.response?.data || error.message);
      message.error(t('failed_to_load_comments'));
      return false;
    }
    return true;
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          'https://crm-api.wisestone-u.com/api/comment/create/comment',
          {
            requestId: parseInt(id || '0'),
            text: newComment,
            commentId: 0,
          },
          {
            headers: {
              Authorization: getToken,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const newCommentObj = {
            id: response.data.id?.toString() || crypto.randomUUID(),
            text: newComment,
            author: response.data.author || 'Unknown',
            timestamp: new Date(),
          };
          setComments((prev) => [...prev, newCommentObj]);
          setNewComment('');
          Notification({ type: 'success', text: t('comment_created_successfully') });

          const fetchSuccess = await fetchComments();
          if (!fetchSuccess) {
            console.warn('Fetch comments failed, preserving optimistic update');
          }
        }
      } catch (error: any) {
        console.error('Error creating comment:', error);
        console.error('Error details:', error.response?.data || error.message);
        message.error(t('failed_to_add_comment'));
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await axios.delete('https://crm-api.wisestone-u.com/api/comment/delete/comment', {
        headers: {
          Authorization: getToken,
        },
        params: {
          id: parseInt(commentId),
        },
      });

      console.log('DELETE /api/comment/delete/comment response:', response);

      if (response.status === 200) {
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        Notification({ type: 'success', text: t('comment_deleted_successfully') });

        const fetchSuccess = await fetchComments();
        if (!fetchSuccess) {
          console.warn('Fetch comments failed after delete, preserving optimistic update');
        }
      }
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      console.error('Error details:', error.response?.data || error.message);
      message.error(t('failed_to_delete_comment'));
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (editingCommentText.trim()) {
      try {
        const response = await axios.put(
          'https://crm-api.wisestone-u.com/api/comment/update/comment',
          {
            requestId: parseInt(id || '0'),
            text: editingCommentText,
            commentId: parseInt(commentId),
          },
          {
            headers: {
              Authorization: getToken,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('PUT /api/comment/update/comment response:', response);

        if (response.status === 200) {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === commentId ? { ...comment, text: editingCommentText, timestamp: new Date() } : comment
            )
          );
          setEditingCommentId(null);
          setEditingCommentText('');
          Notification({ type: 'success', text: t('comment_updated_successfully') });

          // Refetch comments to ensure consistency
          const fetchSuccess = await fetchComments();
          if (!fetchSuccess) {
            console.warn('Fetch comments failed after update, preserving optimistic update');
          }
        }
      } catch (error: any) {
        console.error('Error updating comment:', error);
        console.error('Error details:', error.response?.data || error.message);
        message.error(t('failed_to_update_comment'));
      }
    }
  };

  const startEditingComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  useEffect(() => {
    if (id) {
      console.log('Initializing with RequestId:', id);
      handleFetchClick();
      fetchComments();
    }
  }, [id]);

  const [changes, setChanges] = useState<Change[]>([]);
 
  const getHistoryChanges = async () => {
    try {
      const response = await axios.get('https://crm-api.wisestone-u.com/api/comment/history', {
        headers: {
          Authorization: getToken,
        },
        params: {
          RequestId: parseInt(id || '0'),
          PageIndex: 1,
          PageSize: 10,
        },
      });
      console.log('GET /api/comment/history response buuu:', response.data.data);
      setChanges(response.data.data.items);
    } catch (error: any) {
      console.error('Error fetching history changes:', error);
      console.error('Error details:', error.response?.data || error.message);
      message.error(t('failed_to_load_history'));
    }
  };

  return (
    <StyledTableDetail>
      <div className="table-detail">
        <div className="header-line">
          <div className="title-line">
            <div className="back-buttton">
              <BackButton onClick={() => navigate(-1)} color="black" label={t('back')} />
            </div>
            <h2 className="global-title">{t('request_action')}</h2>
          </div>
        </div>

        <Form form={form} layout="vertical" className="form">
          <InputSelection actionStatus={actionStatus} setActionStatus={setActionStatus} form={form} />
        </Form>
        <br />
        {!window.location.pathname.includes('/add-requests') && (
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span style={{ padding: '10px' }}>
                  <SendOutlined /> {t('comments')}
                </span>
              }
              key="1"
            >
              <br />
              <Title level={4}>{t('comments')}</Title>
              <List
                dataSource={comments}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ width: '100%' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>{item.author}</Text>
                        <Text type="secondary">{dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}</Text>
                        {editingCommentId === item.id ? (
                          <>
                            <Input
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              placeholder={t('edit_comment')}
                            />
                            <Space style={{ marginTop: 8 }}>
                              <Button label={t('save')} type="primary" onClick={() => handleUpdateComment(item.id)} />
                              <Button label={t('cancel')} type="default" onClick={cancelEditingComment} />
                            </Space>
                          </>
                        ) : (
                          <Text>{item.text}</Text>
                        )}
                        <br />
                        <Space>
                          <Button
                            label=""
                            type="text"
                            className="delete-comment-button"
                            icon={<DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />}
                            onClick={() => handleDeleteComment(item.id)}
                          />
                          <br />
                          {editingCommentId !== item.id && (
                            <Button
                              label=""
                              type="text"
                              className="edit-comment-button"
                              icon={<EditOutlined style={{ color: '#1890ff', fontSize: '18px' }} />}
                              onClick={() => startEditingComment(item)}
                            />
                          )}
                        </Space>
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
                <Button type="primary" icon={<SendOutlined />} onClick={handleCommentSubmit} label={t('submit')} />
              </Space>
            </TabPane>
            <TabPane
              style={{ padding: '16px' }}
              tab={
                <span onClick={getHistoryChanges} style={{ padding: '10px' }}>
                  <HistoryOutlined /> {t('change_history')}
                </span>
              }
              key="2"
            >
              <Title level={4}>{t('change_history')}</Title>
              <List
                dataSource={changes}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ width: '100%' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>{item.user?.name}</Text>
                        <Text type="secondary">{dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}</Text>
                        <Text>{item.log}</Text>
                        {item.file && <Text style={{ color: '#1890ff', cursor: 'pointer' }}>{item.file.name}</Text>}
                      </Space>
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        )}
      </div>
    </StyledTableDetail>
  );
}