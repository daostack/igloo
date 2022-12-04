import { ChainId, Goerli, Mainnet } from "@usedapp/core";

export const SNAPSHOT_URI_TESTNET = "https://testnet.snapshot.org";
export const SNAPSHOT_URI = "https://hub.snapshot.org";

export const NETWORKS = {
  [ChainId.Mainnet]: Mainnet,
  [ChainId.Goerli]: Goerli
}
