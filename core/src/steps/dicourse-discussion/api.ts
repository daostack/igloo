import axios from "axios";

export interface Post {
  id: number
  cooked: string
  created_at: string
  name: string
  username: string
  topic_title?: string
  topic_id: number
  raw: string
}

export interface Topic {
  id: number
  created_at: string
  details: {
    created_by: {
      name: string
      username: string
    }
  }
  title: string
  post_stream: {
    posts: Post[]
  }
}

const DISCOURSE_SERVER = "aperture.discourse.group";

export const getTopic = async (topicId: string): Promise<Topic> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/t/${topicId}.json`)).data;
}
