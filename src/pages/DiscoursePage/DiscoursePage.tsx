import { t } from "i18next";
import { Link } from "react-router-dom";
import { DISCOURSE_SERVER } from "../../config/env";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";
import { formatDate } from "../../utils/utils";
import { getLatestPosts } from "./api";
import "./index.scss";

export default function DiscoursePage() {
  const { status, value, error } = useAsync(getLatestPosts);

  return (
    <div className="discourse-page">
      <h2>Lastest posts from {DISCOURSE_SERVER}</h2>
      {error && <span>{error.code}: {error?.message}</span>}

      {status === AsyncStatus.Pending ? <span>{t("Shared.loading")}</span> : (
        value?.map(post => (
          <Link to={String(post.id)} key={post.id}>
            <h3>{post.topic_title}</h3>
            <h6>Created {formatDate(post.created_at)} by {post.username}</h6>
          </Link>
        ))
      )}
    </div>
  )
}
