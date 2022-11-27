import { useCall } from "@usedapp/core";
import { Contract } from "ethers";
import hatsProtocolAbi from "../../data/abis/hats-protocol/hats-protocol.json";

export function useIsTopHat(account: string | undefined): boolean | undefined {
  const { value, error } = useCall(account && {
    contract: new Contract(account, hatsProtocolAbi),
    method: 'isTopHat',
    args: [account]
  }) ?? {}
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}
