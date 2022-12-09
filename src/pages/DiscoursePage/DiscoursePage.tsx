import { t } from "i18next";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { DISCOURSE_SERVER } from "../../config/env";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";
import { Post } from "../../interfaces/discourse";
import { Routes } from "../../navigation/constants";
import { formatDate } from "../../utils/utils";
import { getLatestPosts } from "./api";
import "./index.scss";

export default function DiscoursePage() {
  const navigate = useNavigate();
  const { status, value, error } = useAsync(getLatestPosts);

  const handleClick = useCallback((post: Post) => {
    // TODO: temporary direct always to our space
    navigate(`${Routes.spaces}/aperture-dev-2.eth/create-proposal`, { state: { post: post } })
  }, [navigate])

  return (
    <div className="discourse-page">
      <h2>Lastest posts from {DISCOURSE_SERVER}</h2>
      {error && <span>{error.code} : {error?.message}</span>}

      {status === AsyncStatus.Pending ? <span>{t("Shared.loading")}</span> : (
        value?.map(post => (
          <div key={post.id}>
            <h3>{post.topic_title}</h3>
            <h6>Created {formatDate(post.created_at)} by {post.username}</h6>
            <button onClick={() => handleClick(post)}>Create a proposal on Snapshot</button>
          </div>
        ))
      )}
    </div>
  )
}
