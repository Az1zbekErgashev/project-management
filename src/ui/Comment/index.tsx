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
}

export function Comment({ comment, onDelete, onEdit, requestId }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useUser();
  const handleSave = () => {
    if (editText.trim()) {
      onEdit({ text: editText, requestId: parseInt(requestId), commentId: comment.id });
      setIsEditing(false);
    }
  };

  const onValuesChange = (value: any) => {
    setEditText(value.comment);
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
              <Form form={form} onValuesChange={onValuesChange}>
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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
