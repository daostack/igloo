import axios from "axios";
import { DISCOURSE_SERVER } from "../../config/env";
import { Post } from "../../interfaces/discourse";

// const headers = {
//   "Api-Key": DISCOURSE_API_KEY,
//   "Api-Username": DISCOURSE_API_USERNAME
// }

export const getLatestPosts = async (): Promise<Post[]> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts.json`)).data?.latest_posts;
}
