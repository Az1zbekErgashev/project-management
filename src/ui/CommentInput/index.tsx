import { Avatar } from 'antd';
import { routes } from 'config/config';
import { useUser } from 'hooks/useUserState';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CommentInputProps {
  onSubmit: any;
  requestId: string;
  replyTo?: { email: string; id: number } | null;
  clearReply?: () => void;
}

export function CommentInput({ onSubmit, requestId, replyTo, clearReply }: CommentInputProps) {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const { user } = useUser();

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit({
        requestId: Number.parseInt(requestId),
        text,
        parentCommentId: replyTo?.id || null,
      });
      setText('');
      clearReply?.();
      const textarea = document.querySelector('.comment-textarea') as HTMLTextAreaElement;
      if (textarea) textarea.value = '';
    }
  };

  return (
    <div className="comment-input">
      <div className="input-header">
        <div className="input-avatar">
          {user?.image?.path ? (
            <Avatar size={40} src={routes.api.baseUrl + '/' + user?.image?.path} />
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
        </div>
        <div className="input-label">{t('write_a_comment')}</div>
      </div>

      {replyTo && (
        <div className="replying-to">
          Replying to <strong>{replyTo.email}</strong>
          <button onClick={clearReply} className="clear-reply-btn">
            ×
          </button>
        </div>
      )}

      <textarea
        className="comment-textarea"
        placeholder={t('write_a_comment')}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="input-actions">
        <button
          className={`submit-btn ${!text.trim() ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!text.trim()}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          {t('submit')}
        </button>
      </div>
    </div>
  );
}
