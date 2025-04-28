import { Comment, CommentInput } from 'ui';
import { useComments } from 'hooks/useComments';
import { StyledCommentsSection } from './style';
import { useTranslation } from 'react-i18next';

interface props {
  requestId: string;
}

export function CommentsSection({ requestId }: props) {
  const { createComment, handleDelete, updateComment, comments } = useComments(parseInt(requestId));
  const { t } = useTranslation();

  return (
    <StyledCommentsSection>
      <div className="comments-section">
        <div className="comments-list">
          {comments?.items?.length === 0 ? (
            <div className="empty-comments">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <p>{t('no_comment_yet')}</p>
            </div>
          ) : (
            comments?.items?.map((comment: any) => (
              <Comment
                key={comment.id}
                requestId={requestId}
                comment={comment}
                onDelete={() => handleDelete(comment.id)}
                onEdit={updateComment}
              />
            ))
          )}
        </div>

        <CommentInput requestId={requestId} onSubmit={createComment} />
      </div>
    </StyledCommentsSection>
  );
}
