import { t } from "i18next";
import { Link } from "react-router-dom";
import { DISCOURSE_SERVER } from "../../config/env";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";
import { formatDate } from "../../utils/utils";
import { getLatestPosts } from "./api";
import "./index.scss";

export default function DiscoursePage() {
  const { status, value: posts, error } = useAsync(getLatestPosts);

  return (
    <div className="discourse-page">
      <h2>Lastest posts across topics from {DISCOURSE_SERVER}</h2>
      {error && <span>{error.code}: {error?.message}</span>}
      {/* <Link to={Routes.createTopic}>Create a Topic</Link> */}
      {status === AsyncStatus.Pending ? <span>{t("Shared.loading")}</span> : (
        posts?.map(post => (
          <Link to={String(post.topic_id)} key={post.id}>
            <h4>{post.topic_title}</h4>
            <h6>Post by {post.username} at {formatDate(post.created_at)}</h6>
          </Link>
        ))
      )}
    </div>
  )
}
