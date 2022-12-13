import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { AsyncStatus, useAsync } from "../../../../hooks/useAsync";
import { getPost } from "../../api";
import { Post as IPost } from "../../../../interfaces/discourse";
import { Routes } from "../../../../navigation/constants";
import { formatDate } from "../../../../utils/utils";
import Replies from "../Replies/Replies";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const getPostCallback = useCallback(async () => {
    if (!postId) return;
    return await getPost(postId);
  }, [postId])

  const { status, value: post, error } = useAsync(getPostCallback);

  const createSnapshotProposal = useCallback((post: IPost) => {
    // TODO: temporary direct always to our space
    navigate(`${Routes.spaces}/aperture-dev-2.eth/create-proposal`, { state: { post: post } })
  }, [navigate])

  if (!postId) return null;
  if (error) return <span>{error.code}: {error?.message}</span>;
  if (status === AsyncStatus.Pending) return <span>Loading...</span>;

  return (
    <div>
      <h2>{post?.topic_title ?? post?.topic_slug}</h2>
      <p>{post?.raw}</p>
      <button onClick={() => createSnapshotProposal(post!)}>Create a proposal on Snapshot</button>
      <Replies topicId={String(post?.topic_id)} />
      <h6>Created {formatDate(post?.created_at)} by {post?.username}</h6>
    </div>
  )
}
