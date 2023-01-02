import { getDefaultProvider } from "ethers";
import { Config, Goerli, Mainnet } from "@usedapp/core";
import { APIS } from "./env";
import { CHAINS } from "./constants";

export const dappConfig: Config = {
  networks: Object.values(CHAINS),
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet', { alchemy: APIS[1] }),
    [Goerli.chainId]: getDefaultProvider('goerli', { alchemy: APIS[5] }),
  },
  autoConnect: true
}
