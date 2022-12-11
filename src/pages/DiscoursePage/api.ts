import axios from "axios";
import { DISCOURSE_SERVER } from "../../config/env";
import { Post, Reply } from "../../interfaces/discourse";

// const headers = {
//   "Api-Key": DISCOURSE_API_KEY,
//   "Api-Username": DISCOURSE_API_USERNAME
// }

export const getLatestPosts = async (): Promise<Post[]> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts.json`)).data?.latest_posts;
}

export const getPost = async (postId: string): Promise<Post> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts/${postId}.json`)).data;
}

export const getPostReplies = async (postId: string): Promise<Reply[]> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts/${postId}/replies.json`)).data;
}
