import axios from "axios";
import { DISCOURSE_SERVER } from "./constants";
import { Topic } from "./interfaces";

export const getTopic = async (topicId: string): Promise<Topic> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/t/${topicId}.json`)).data;
}
