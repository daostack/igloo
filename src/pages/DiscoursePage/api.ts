import axios from "axios";
import { DISCOURSE_API_KEY, DISCOURSE_API_USERNAME, DISCOURSE_SERVER } from "../../config/env";
import { CreateTopicPayload, Post, Topic } from "../../interfaces/discourse";

const headers = {
  "content-type": "multipart/form-data",
  "api-key": DISCOURSE_API_KEY,
  "api-username": DISCOURSE_API_USERNAME,
}

export const getLatestPosts = async (): Promise<Post[]> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts.json`)).data?.latest_posts;
}

export const getTopic = async (topicId: string): Promise<Topic> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/t/${topicId}.json`)).data;
}

export const createTopic = async (data: CreateTopicPayload) => {
  return await axios.post(
    `https://${DISCOURSE_SERVER}/posts.json`,
    JSON.stringify(data),
    {
      headers: headers
    });
}
