import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

export function useComments(requestId?: number) {
  const [commentId, setCommentId] = useState<number | null>();
  const { appendData: createComment } = useQueryApiClient({
    request: {
      url: `/api/comment/create/comment`,
      method: 'POST',
    },
    onSuccess() {
      refetchRequest();
    },
  });

  const { refetch: deleteComment } = useQueryApiClient({
    request: {
      url: `/api/comment/delete/comment?id=${commentId}`,
      method: 'DELETE',
    },
    onSuccess() {
      setCommentId(null);
      refetchRequest();
    },
  });

  const { appendData: updateComment } = useQueryApiClient({
    request: {
      url: `/api/comment/update/comment`,
      method: 'PUT',
    },
    onSuccess() {
      refetchRequest();
    },
  });

  const { data: comments, refetch: refetchRequest } = useQueryApiClient({
    request: {
      url: `/api/comment/comments?RequestId=${requestId}`,
      method: 'GET',
    },
  });

  const { data: history, refetch: refetchHistory } = useQueryApiClient({
    request: {
      url: `/api/comment/history?RequestId=${requestId}`,
      method: 'GET',
    },
  });

  const handleDelete = (comment: number | null) => {
    setCommentId(comment);
  };

  useEffect(() => {
    if (commentId) {
      deleteComment();
    }
  }, [commentId]);

  return {
    createComment,
    handleDelete,
    updateComment,
    comments: comments.data,
    history: history.data,
    refetchHistory,
  };
}
