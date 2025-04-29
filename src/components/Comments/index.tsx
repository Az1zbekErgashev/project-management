import { useState } from 'react';
import { Avatar, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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

  const formatDate = (dateString: string) => {
    try {
      return `about ${dayjs(dateString).format('YYYY.MM.DD HH:mm:ss')}`;
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

  const deleteComment = (id: number) => {
    handleDelete(id);
  };

  const handleCreateComment = () => {
    createComment({ requestId: parseInt(requestId), text: newComment });
    setNewComment('');
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
                      {/* <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="comment-edit-btn"
                        onClick={() => handleEditComment(comment.id, comment.text)}
                      /> */}
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="comment-delete-btn"
                        onClick={() => deleteComment(comment.id)}
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
                  onClick={() => {
                    setReplyingTo({ id: comment.id, email: comment.user.email });
                    smoothScroll('bottom', 0);
                  }}
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
                        {/* <Button
                          type="text"
                          icon={<EditOutlined />}
                          className="comment-edit-btn"
                          onClick={() => handleEditComment(reply.id, reply.text)}
                        /> */}
                        {user?.id === reply?.user?.id && (
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className="comment-delete-btn"
                            onClick={() => deleteComment(reply.id)}
                            danger
                          />
                        )}
                      </div>
                    </div>

                    {reply.parentCommentId && (
                      <Text type="secondary" className="reply-to-text">
                        {t('replying_to')}&nbsp;&nbsp;
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
                      onClick={() => {
                        setReplyingTo({ id: reply.id, email: reply.user.email });
                        smoothScroll('bottom', 0);
                      }}
                    >
                      {t('reply')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="show-more" onClick={() => setParams((res) => ({ ...res, pageSize: res.pageSize + 10 }))}>
          {t('show_more')}
        </div>

        {replyingTo ? (
          <div className="reply-form-container">
            <div className="reply-form-content">
              <Text type="secondary" className="reply-form-label">
                {t('replying_to')}&nbsp;&nbsp;<Text strong>{replyingTo.email}</Text>
              </Text>
              <Space className="reply-form-actions">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t('write_reply')}
                  className="reply-form-input"
                />
                <Button onClick={cancelReply}>Cancel</Button>
                <Button type="primary" onClick={handleReply}>
                  {t('reply')}
                </Button>
              </Space>
            </div>
          </div>
        ) : (
          <div className="reply-form-container">
            <div className="reply-form-content">
              <Space className="reply-form-actions">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t('write_new_comment')}
                  className="reply-form-input"
                />
                <Button type="primary" onClick={handleCreateComment}>
                  {t('submit')}
                </Button>
              </Space>
            </div>
          </div>
        )}
      </div>
    </StyledCommentsSection>
  );
}
