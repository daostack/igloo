import { ChainId } from "@usedapp/core";

export const CHAIN_ID: ChainId = process.env.REACT_APP_CHAIN_ID ? parseInt(process.env.REACT_APP_CHAIN_ID) : ChainId.Goerli;

export const HATS_PROTOCOL = process.env.REACT_APP_HATS_PROTOCOL ?? "";

export const ENDPOINTS = {
  [ChainId.Mainnet]: process.env.REACT_APP_MAINNET_ENPOINT,
  [ChainId.Goerli]: process.env.REACT_APP_GOERLI_ENDPOINT
}

export const APIS = {
  [ChainId.Mainnet]: process.env.REACT_APP_ALCHEMY_MAINNET_API_KEY,
  [ChainId.Goerli]: process.env.REACT_APP_ALCHEMY_GOERLI_API_KEY
}

export const DISCOURSE_SERVER = process.env.REACT_APP_DISCOURSE_SERVER;
export const DISCOURSE_API_KEY = process.env.REACT_APP_DISCOURSE_API_KEY;
export const DISCOURSE_API_USERNAME = process.env.REACT_APP_DISCOURSE_API_USERNAME;
