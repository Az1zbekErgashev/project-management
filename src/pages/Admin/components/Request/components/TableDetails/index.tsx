import React, { useEffect, useState } from 'react';
import { Form, Input, Tabs, List, Card, Space, Typography, Divider, message } from 'antd';
import { SendOutlined, HistoryOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { RequestModel } from '../RequestList/type';
import { InputSelection } from '../InputSelection';
import { StyledTableDetail } from './style';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, Button, ConfirmModal, Notification } from 'ui';
import axios from 'axios';
import useJwt from 'utils/useJwt';
import useQueryApiClient from 'utils/useQueryApiClient';
import { TFunction } from 'i18next';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

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

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_requests_title'),
  content: t('delete_requests_description'),
  open: true,
  onConfirm,
  onCancel,
});

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
  const [disable, setDisable] = useState<boolean>(true);
  const [actionModal, setActionModal] = useState<any>();

  const { refetch: handleFetchClick, data: request } = useQueryApiClient({
    request: {
      url: `/api/request/requets/${id}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(response) {
      form.setFieldsValue({
        ...response.data,
      });
    },
  });

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

          handleFetchClick();
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

        handleFetchClick();
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
          handleFetchClick();
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
    if (window.location.pathname.includes('request-detail')) {
      handleFetchClick();
    }
  }, []);

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

  useEffect(() => {
    if (window.location.pathname.includes('add-requests')) setDisable(false);
    else setDisable(true);
  }, []);

  const { refetch: handleDelete } = useQueryApiClient({
    request: {
      url: `/api/request/delete-request?id=${id}`,
      method: 'DELETE',
    },
    onSuccess() {
      navigate(-1);
    },
  });

  const handleDeleteModal = () => {
    setActionModal(
      createModalConfig(
        t,
        () => {
          handleDelete();
        },
        () => {
          setActionModal(null);
        }
      )
    );
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
          {disable && window.location.pathname.includes('request-detail') && (
            <div className="header-btn">
              <Button onClick={handleDeleteModal} className="btn" danger label={t('delete')} />
              <Button onClick={() => setDisable(false)} className="btn" type="primary" label={t('edit_request')} />
            </div>
          )}
        </div>

        <Form form={form} layout="vertical" className="form">
          <InputSelection
            setDisable={setDisable}
            disable={disable}
            actionStatus={actionStatus}
            setActionStatus={setActionStatus}
            form={form}
          />
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
              forceRender
            >
              <br />
              <Title level={4}>{t('comments')}</Title>
              <List
                dataSource={request?.data?.comments}
                renderItem={(item: any) => (
                  <List.Item>
                    <Card style={{ width: '100%' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong className="comment-author">
                          {item?.user?.name}&nbsp;{item?.user?.surname}
                        </Text>
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
              forceRender
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
      {actionModal && <ConfirmModal {...actionModal} />}
    </StyledTableDetail>
  );
}
