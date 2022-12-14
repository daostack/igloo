
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

export interface CreateTopicPayload {
  title: string
  raw: string
  topic_id?: number
  category?: number
}
