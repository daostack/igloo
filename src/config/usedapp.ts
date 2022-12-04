import { getDefaultProvider } from "ethers";
import { Config, Goerli, Mainnet } from "@usedapp/core";

export const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet', { alchemy: process.env.REACT_APP_ALCHEMY_MAINNET_API_KEY }),
    [Goerli.chainId]: getDefaultProvider('goerli', { alchemy: process.env.REACT_APP_ALCHEMY_GOERLI_API_KEY }),
  },
  autoConnect: true
}
