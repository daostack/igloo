import { ChainId } from "@usedapp/core";

export const HATS_PROTOCOL = process.env.REACT_APP_HATS_PROTOCOL ?? "";
export const ENDPOINTS = {
  [ChainId.Mainnet]: process.env.REACT_APP_MAINNET_ENPOINT,
  [ChainId.Goerli]: process.env.REACT_APP_GOERLI_ENDPOINT
}
