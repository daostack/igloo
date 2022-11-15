import { getDefaultProvider } from "ethers";
import { Config, Goerli, Mainnet } from "@usedapp/core";

export const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}
