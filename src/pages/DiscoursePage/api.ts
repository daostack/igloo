import axios from "axios";
import { DISCOURSE_API_KEY, DISCOURSE_API_USERNAME } from "../../config/env";
import { Categories } from "../../interfaces/discourse";

const DISCOURSE_SERVER = "community.starknet.io";
const headers = {
  "Api-Key": DISCOURSE_API_KEY,
  "Api-Username": DISCOURSE_API_USERNAME
}

export const getCategories = async (): Promise<Categories> => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/categories.json`)).data?.category_list;
}

export const getLatestPosts = async () => {
  return await (await axios.get(`https://${DISCOURSE_SERVER}/posts.json`, { headers })).data;
}
