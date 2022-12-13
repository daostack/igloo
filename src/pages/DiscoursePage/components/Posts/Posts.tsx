import ReactHtmlParser from 'react-html-parser';
import { Post } from "../../../../interfaces/discourse";
import { formatDate } from "../../../../utils/utils";
import "./index.scss";

interface Props {
  posts: Post[] | undefined
}

export default function Posts({ posts }: Props) {

  return (
    <div className="replies">
      <h5>Replies</h5>
      {posts?.length === 0 && <span>No posts yet</span>}
      {/* TODO: we assume the first post is the topic content therefore we "slice". Need to verify it's correct. */}
      {posts?.slice(1).map((post, index) => (
        <div key={index} className="replies__reply">
          <div className="replies__reply__content">
            {ReactHtmlParser(post.cooked)}
          </div>
          <h6>{formatDate(post?.created_at)} by {post?.username}</h6>
        </div>
      ))}
    </div>
  )
}
