// Comments.tsx
import { useState, useRef, useEffect } from 'react';
import { Avatar, Button, Input, Typography, Space, InputRef, Modal } from 'antd';
import { DeleteOutlined, SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StyledCommentsSection } from './style';
import { useComments } from 'hooks/useComments';
import { useUser } from 'hooks/useUserState';
import { routes } from 'config/config';
import { smoothScroll } from 'utils/globalFunctions';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

const { Text, Paragraph } = Typography;
const { confirm } = Modal;

interface User {
  id: number;
  name: string;
  email: string;
  surname: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  isDeleted: number;
  dateOfBirth: string;
  roleId: string;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  updatedAt?: string;
  user: User;
  parentCommentId?: number;
  replies: Comment[];
}

export function CommentsSection({ requestId }: any) {
  const { comments, createComment, handleDelete, updateComment, setParams } = useComments(parseInt(requestId));
  const [replyingTo, setReplyingTo] = useState<{ id: number; email: string } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<{ id: number; text: string } | null>(null);
  const { user } = useUser();
  const { t } = useTranslation();

  const replyInputRef = useRef<InputRef>(null);
  const newCommentInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (replyingTo) {
      setTimeout(() => {
        replyInputRef.current?.focus();
      }, 100);
    } else {
      newCommentInputRef.current?.focus();
    }
  }, [replyingTo]);

  const formatDate = (dateString: string) => {
    try {
      return `${t('about')} ${dayjs(dateString).format('YYYY.MM.DD HH:mm:ss')}`;
    } catch (error) {
      return 'recently';
    }
  };

  const findParentComment = (parentId: number): Comment | null => {
    for (const comment of comments) {
      if (comment.id === parentId) {
        return comment;
      }
      for (const reply of comment.replies) {
        if (reply.id === parentId) {
          return reply;
        }
      }
    }
    return null;
  };

  const handleReply = () => {
    if (!replyingTo || !replyText?.trim()) return;
    createComment({ requestId: parseInt(requestId), text: replyText, parentCommentId: replyingTo?.id });
    setReplyText('');
    setReplyingTo(null);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };

  const handleEditComment = (id: number, text: string) => {
    setEditingComment({ id, text });
  };

  const saveEditedComment = () => {
    if (!editingComment) return;
    updateComment({ requestId: parseInt(requestId), text: editingComment.text, commentId: editingComment.id });
    setEditingComment(null);
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: t('delete_comment_confirmation'),
      content: t('are_you_sure_delete_comment'),
      okText: t('yes'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        handleDelete(id);
      },
      onCancel() {},
    });
  };

  const handleCreateComment = () => {
    if (!newComment?.trim()) return;
    createComment({ requestId: parseInt(requestId), text: newComment });
    setNewComment('');
  };

  const handleReplyClick = (commentId: number, email: string) => {
    setReplyingTo({ id: commentId, email });
    smoothScroll('bottom', 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (replyingTo) {
        handleReply();
      } else {
        handleCreateComment();
      }
    }
  };

  return (
    <StyledCommentsSection>
      <div className="comments-container">
        {comments?.map((comment: any) => (
          <div key={comment.id} className="comment-block">
            <div className="comment-item">
              <Avatar src={`${routes.api.baseUrl}/${comment?.user?.image?.path}`} className="comment-avatar">
                {comment.user.name.charAt(0) + comment.user.surname.charAt(0)}
              </Avatar>

              <div className="comment-content">
                <div className="comment-header">
                  <div>
                    <Text strong className="comment-username">
                      {comment?.user?.name} {comment?.user?.surname}
                    </Text>
                    <Text type="secondary" className="comment-time">
                      {formatDate(comment.createdAt)}
                    </Text>
                  </div>
                  {user?.id === comment?.user?.id && (
                    <div className="comment-actions">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="comment-delete-btn"
                        onClick={() => showDeleteConfirm(comment.id)}
                        danger
                      />
                    </div>
                  )}
                </div>

                {editingComment && editingComment.id === comment.id ? (
                  <div className="comment-edit-form">
                    <Input
                      value={editingComment.text}
                      onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                      className="comment-edit-input"
                    />
                    <Button size="small" type="primary" onClick={saveEditedComment}>
                      {t('save')}
                    </Button>
                  </div>
                ) : (
                  <Paragraph className="comment-text">{comment.text}</Paragraph>
                )}

                <Button
                  type="link"
                  className="comment-reply-btn"
                  onClick={() => handleReplyClick(comment.id, comment.user.email)}
                >
                  {t('reply')}
                </Button>
              </div>
            </div>

            <div className="replies-container">
              {comment?.replies?.map((reply: any) => (
                <div key={reply.id} className="comment-item reply-item">
                  <Avatar src={`${routes.api.baseUrl}/${reply?.user?.image?.path}`} className="comment-avatar">
                    {reply?.user?.name?.charAt(0) + reply?.user?.surname?.charAt(0)}
                  </Avatar>

                  <div className="comment-content">
                    <div className="comment-header">
                      <div>
                        <Text strong className="comment-username">
                          {reply.user?.name} {reply.user?.surname}
                        </Text>
                        <Text type="secondary" className="comment-time">
                          {formatDate(reply?.createdAt)}
                        </Text>
                      </div>
                      <div className="comment-actions">
                        {user?.id === reply?.user?.id && (
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className="comment-delete-btn"
                            onClick={() => showDeleteConfirm(reply.id)}
                            danger
                          />
                        )}
                      </div>
                    </div>

                    {reply.parentCommentId && (
                      <Text type="secondary" className="reply-to-text">
                        {t('replying_to')}  
                        {findParentComment(reply.parentCommentId)?.user.email || 'Unknown'}
                      </Text>
                    )}

                    {editingComment && editingComment.id === reply.id ? (
                      <div className="comment-edit-form">
                        <Input
                          value={editingComment.text}
                          onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                          className="comment-edit-input"
                        />
                        <Button size="small" type="primary" onClick={saveEditedComment}>
                          {t('save')}
                        </Button>
                      </div>
                    ) : (
                      <Paragraph className="comment-text">{reply.text}</Paragraph>
                    )}

                    <Button
                      type="link"
                      className="comment-reply-btn"
                      onClick={() => handleReplyClick(reply.id, reply.user.email)}
                    >
                      {t('reply')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {replyingTo ? (
          <div className="reply-form-container">
            <div className="reply-form-content">
              <Text type="secondary" className="reply-form-label">
                {t('replying_to')}  <Text strong>{replyingTo.email}</Text>
              </Text>
              <Space className="reply-form-actions">
                <Input
                  ref={replyInputRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t('write_reply')}
                  className="reply-form-input"
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={cancelReply}>{t('cancel')}</Button>
                <Button type="primary" onClick={handleReply} icon={<SendOutlined />} />
              </Space>
            </div>
          </div>
        ) : (
          <div className="reply-form-container">
            <div className="reply-form-content">
              <Space className="reply-form-actions">
                <Input
                  ref={newCommentInputRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t('write_new_comment')}
                  className="reply-form-input"
                  onKeyDown={handleKeyDown}
                />
                <Button style={{height: "60px"}} type="primary" onClick={handleCreateComment} icon={<SendOutlined />} 
                />
              </Space>
            </div>
          </div>
        )}
      </div>
    </StyledCommentsSection>
  );
}