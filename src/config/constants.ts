import { ChainId, Goerli, Mainnet } from "@usedapp/core";

export const IGLOO_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/gershido/hats-protocol-goerli";

export const SNAPSHOT_URI_TESTNET = "https://testnet.snapshot.org";
export const SNAPSHOT_URI = "https://hub.snapshot.org";

export const CHAINS = {
  [ChainId.Mainnet]: Mainnet,
  [ChainId.Goerli]: Goerli
}

export enum ApolloContext {
  IglooSubgraph,
  Snapshot,
}
