import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Avatar, Form } from 'antd';
import dayjs from 'dayjs';
import { routes } from 'config/config';
import { useUser } from 'hooks/useUserState';

interface CommentProps {
  comment: {
    id: string;
    text: string;
    createdAt?: string;
    replies: any;
    user?: {
      id: number;
      name?: string;
      surname?: string;
      image?: {
        path: string;
      };
    };
  };
  onDelete: () => void;
  onEdit: any;
  requestId: string;
  onReply?: (commentId: string, replyText: string, parentReplyId?: string) => void;
  onDeleteReply?: (replyId: string) => void;
  onEditReply?: (replyId: string, text: string) => void;
}

export function Comment({ comment, onDelete, onEdit, requestId, onReply, onDeleteReply, onEditReply }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useUser();
  const [replyText, setReplyText] = useState('');
  const [isReplyEditing, setIsReplyEditing] = useState<{ [key: string]: boolean }>({});
  const [editReplyText, setEditReplyText] = useState<{ [key: string]: string }>({});
  const [replyToReplyText, setReplyToReplyText] = useState<{ [key: string]: string }>({}); // For replies to replies

  const handleSave = () => {
    if (editText.trim()) {
      onEdit({ text: editText, requestId: parseInt(requestId), commentId: comment.id });
      setIsEditing(false);
    }
  };

  const handleReplySave = () => {
    if (replyText.trim()) {
      onReply && onReply(comment.id, replyText);
      setReplyText('');
    }
  };

  const handleEditReplySave = (replyId: string) => {
    const replyTextToEdit = editReplyText[replyId];
    if (replyTextToEdit.trim()) {
      onEditReply && onEditReply(replyId, replyTextToEdit);
      setIsReplyEditing((prev) => ({ ...prev, [replyId]: false }));
    }
  };

  const handleReplyToReplySave = (parentReplyId: string) => {
    const replyTextToSave = replyToReplyText[parentReplyId];
    if (replyTextToSave.trim()) {
      onReply && onReply(comment.id, replyTextToSave, parentReplyId);
      setReplyToReplyText((prev) => ({ ...prev, [parentReplyId]: '' }));
    }
  };

  const handleEditReplyChange = (replyId: string, value: string) => {
    setEditReplyText((prev) => ({ ...prev, [replyId]: value }));
  };

  const handleReplyToReplyChange = (parentReplyId: string, value: string) => {
    setReplyToReplyText((prev) => ({ ...prev, [parentReplyId]: value }));
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="user-info">
          <div className={comment.user?.image ? '' : 'user-avatar'}>
            {comment.user?.image?.path ? (
              <Avatar size={48} src={routes.api.baseUrl + '/' + comment.user?.image?.path} />
            ) : (
              comment?.user?.name?.[0]
            )}
          </div>
          <div className="user-details">
            <span className="user-name">
              {comment?.user?.name} {comment?.user?.surname}
            </span>
            <span className="comment-date">
              {comment.createdAt && dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>

      {user?.id !== comment?.user?.id && <div className="comment-text">{comment.text}</div>}
      {user?.id === comment?.user?.id && (
        <>
          {isEditing ? (
            <div className="edit-area">
              <Form form={form}>
                <textarea
                  className="edit-textarea"
                  defaultValue={comment.text}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="edit-buttons">
                  <button className="btn btn-primary" onClick={handleSave}>
                    {t('save')}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    {t('cancel')}
                  </button>
                </div>
              </Form>
            </div>
          ) : (
            <>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-actions">
                <button className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  {t('edit')}
                </button>
                <button className="action-btn delete-btn" onClick={onDelete}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  {t('delete')}
                </button>
                {onReply && <button onClick={() => setReplyText('')}>{t('reply')}</button>}
              </div>
            </>
          )}
        </>
      )}

      {comment?.replies && comment?.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply: any) => (
            <div className="reply" key={reply.id}>
              <div className="user-info">
                <div className={reply.user?.image ? '' : 'user-avatar'}>
                  {reply.user?.image?.path ? (
                    <Avatar size={48} src={`${routes.api.baseUrl}/${reply.user.image.path}`} />
                  ) : (
                    reply.user?.name?.[0]
                  )}
                </div>
                <div className="user-details">
                  <span className="user-name">
                    {reply.user?.name} {reply.user?.surname}
                  </span>
                  <span className="reply-date">{dayjs(reply.createdAt).format('YYYY.MM.DD HH:mm:ss')}</span>
                </div>
              </div>
              {isReplyEditing[reply.id] ? (
                <div className="edit-area">
                  <textarea
                    value={editReplyText[reply.id] || reply.text}
                    onChange={(e) => handleEditReplyChange(reply.id, e.target.value)}
                  />
                  <div className="edit-buttons">
                    <button className="btn btn-primary" onClick={() => handleEditReplySave(reply.id)}>
                      {t('save')}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsReplyEditing({ ...isReplyEditing, [reply.id]: false })}
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="reply-text">{reply.text}</div>
              )}
              {user?.id === reply.user?.id && !isReplyEditing[reply.id] && (
                <div className="reply-actions">
                  <button onClick={() => setIsReplyEditing({ ...isReplyEditing, [reply.id]: true })}>
                    {t('edit')}
                  </button>
                  <button onClick={() => onDeleteReply && onDeleteReply(reply.id)}>{t('delete')}</button>
                  {onReply && (
                    <button onClick={() => setReplyToReplyText((prev) => ({ ...prev, [reply.id]: '' }))}>
                      {t('reply')}
                    </button>
                  )}
                </div>
              )}

              {/* Reply to reply */}
              {onReply && !isReplyEditing[reply.id] && replyToReplyText[reply.id] && (
                <div className="reply-to-reply-input">
                  <textarea
                    value={replyToReplyText[reply.id] || ''}
                    onChange={(e) => handleReplyToReplyChange(reply.id, e.target.value)}
                    placeholder={t('type-your-reply')}
                  />
                  <button onClick={() => handleReplyToReplySave(reply.id)}>{t('reply')}</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {onReply && !isEditing && (
        <div className="reply-input">
          <textarea
            className="reply-textarea"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t('type-your-reply')}
          />
          <button onClick={handleReplySave}>{t('reply')}</button>
        </div>
      )}
    </div>
  );
}
