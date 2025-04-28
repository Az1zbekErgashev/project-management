import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Avatar, Form } from 'antd';
import dayjs from 'dayjs';
import { routes } from 'config/config';
import { useUser } from 'hooks/useUserState';

interface User {
  id: number;
  name?: string;
  surname?: string;
  image?: {
    path: string;
  };
}

interface CommentType {
  id: string;
  text: string;
  createdAt?: string;
  user?: User;
  replies?: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  onDelete: (commentId: string) => void;
  onEdit: (data: { text: string; requestId: number; commentId: string }) => void;
  requestId: string;
}

function SingleComment({ comment, onDelete, onEdit, requestId }: CommentProps) {
  const { t } = useTranslation();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [form] = Form.useForm();
  const [showReplies, setShowReplies] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit({ text: editText, requestId: parseInt(requestId), commentId: comment.id });
      setIsEditing(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="user-info">
          <div className={comment.user?.image ? '' : 'user-avatar'}>
            {comment.user?.image?.path ? (
              <Avatar size={48} src={routes.api.baseUrl + '/' + comment.user.image.path} />
            ) : (
              comment.user?.name?.[0]
            )}
          </div>
          <div className="user-details">
            <span className="user-name">
              {comment.user?.name} {comment.user?.surname}
            </span>
            <span className="comment-date">
              {comment.createdAt && dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>

      {user?.id !== comment.user?.id && <div className="comment-text">{comment.text}</div>}
      {user?.id === comment.user?.id && (
        <>
          {isEditing ? (
            <div className="edit-area">
              <Form form={form}>
                <textarea className="edit-textarea" value={editText} onChange={(e) => setEditText(e.target.value)} />
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
                  {t('edit')}
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(comment.id)}>
                  {t('delete')}
                </button>
              </div>
            </>
          )}
        </>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 ml-8">
          <button className="text-sm text-primary flex items-center gap-1" onClick={() => setShowReplies(!showReplies)}>
            {showReplies
              ? t('hideReplies') || 'Скрыть ответы'
              : `${t('showReplies') || 'Показать ответы'} (${comment.replies.length})`}
          </button>

          {showReplies && (
            <div className="space-y-3 mt-2">
              {comment.replies.map((reply) => (
                <SingleComment
                  key={reply.id}
                  comment={reply}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  requestId={requestId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Comment({ comment, onDelete, onEdit, requestId }: CommentProps) {
  const handleDelete = (commentId: string) => {
    onDelete(commentId);
  };

  return <SingleComment comment={comment} onDelete={handleDelete} onEdit={onEdit} requestId={requestId} />;
}
