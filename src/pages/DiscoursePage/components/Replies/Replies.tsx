import { useCallback } from "react";
import { AsyncStatus, useAsync } from "../../../../hooks/useAsync";
import { getPostReplies } from "../../api";

interface Props {
  postId: string
}

export default function Replies({ postId }: Props) {
  
  const getRepliesCallback = useCallback(async () => {
    return await getPostReplies(postId);
  }, [postId])

  const { status, value: replies, error } = useAsync(getRepliesCallback);

  return (
    <div>
      <h4>Replies</h4>
      {error && <span>Failed loading replies {error.code}: {error.message}</span>}
      {status === AsyncStatus.Pending && <span>Loading replies</span>}
      {replies?.length === 0 && <span>No replies yet</span>}
    </div>
  )
}
