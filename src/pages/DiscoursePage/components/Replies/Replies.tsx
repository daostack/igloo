import { useCallback } from "react";
import ReactHtmlParser from 'react-html-parser';
import { AsyncStatus, useAsync } from "../../../../hooks/useAsync";
import { formatDate } from "../../../../utils/utils";
import { getPostsFromTopic } from "../../api";
import "./index.scss";

interface Props {
  topicId: string
}

export default function Replies({ topicId }: Props) {

  const getPostFromTopicCallback = useCallback(async () => {
    return await getPostsFromTopic(topicId);
  }, [topicId])

  const { status, value: replies, error } = useAsync(getPostFromTopicCallback);

  if (status === AsyncStatus.Pending) return <span>Loading replies</span>;
  if (error) return <span>Failed loading replies {error.code}: {error.message}</span>;

  return (
    <div className="replies">
      <h5>Replies</h5>
      {replies?.length === 0 && <span>No replies yet</span>}
      {replies?.map((reply, index) => (
        <div key={index} className="replies__reply">
          <div className="replies__reply__content">
            {ReactHtmlParser(reply.cooked)}
          </div>
          <h6>{formatDate(reply?.created_at)} by {reply?.username}</h6>
        </div>
      ))}
    </div>
  )
}
