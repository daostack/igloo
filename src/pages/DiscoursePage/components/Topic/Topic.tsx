import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import ReactHtmlParser from 'react-html-parser';
import { AsyncStatus, useAsync } from "../../../../hooks/useAsync";
import { getTopic } from "../../api";
import { Topic as ITopic } from "../../../../interfaces/discourse";
import { Routes } from "../../../../navigation/constants";
import { formatDate } from "../../../../utils/utils";
import Posts from "../Posts/Posts";

export default function Topic() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const getTopicCallback = useCallback(async () => {
    if (!topicId) return;
    return await getTopic(topicId);
  }, [topicId])

  const { status, value: topic, error } = useAsync(getTopicCallback);

  console.log(topic)

  const createSnapshotProposal = useCallback((topic: ITopic) => {
    // TODO: temporary direct always to our space
    navigate(`${Routes.spaces}/aperture-dev-2.eth/create-proposal`, { state: { topic: topic } })
  }, [navigate])

  if (!topicId) return null;
  if (error) return <span>{error.code}: {error?.message}</span>;
  if (status === AsyncStatus.Pending) return <span>Loading...</span>;

  return (
    <div>
      <h2>{topic?.title}</h2>
      <p>{ReactHtmlParser(topic?.post_stream.posts[0].cooked)}</p>
      <button onClick={() => createSnapshotProposal(topic!)}>Create a proposal on Snapshot from this topic</button>
      <h6>Created {formatDate(topic?.created_at)} by {topic?.details.created_by.name}</h6>
      <Posts posts={topic?.post_stream.posts} />
    </div>
  )
}
