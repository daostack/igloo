import { useCall, useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import { HATS_PROTOCOL } from "../../config/env";
import HatsProtocolAbi from "../../data/abis/hatsProtocol/hats-protocol.json";
import { Hat } from "../../interfaces/hatsProtocol";

enum TransactionName {
  CreateHat = "Create Hat",
  MintHat = "Mint Hat",
}

export function useName(): string | undefined {
  const { value, error } = useCall({
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'name',
    args: []
  }) ?? {}
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useIsTopHat(account: string | undefined, hatId: string | undefined): boolean | undefined {
  const { value, error } = useCall(account && {
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'isTopHat',
    args: [hatId]
  }) ?? {}
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useIsWearerOfHat(account: string | undefined, hatId: string): boolean | undefined {
  const { value, error } = useCall(account && {
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'isWearerOfHat',
    args: [account, hatId]
  }) ?? {}
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useViewHat(hatId: string | undefined): Hat | undefined {
  const { value, error } = useCall(hatId && {
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'viewHat',
    args: [hatId]
  }) ?? {}
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export function useCreateHat() {
  return useContractFunction(new Contract(HATS_PROTOCOL, HatsProtocolAbi), "createHat", { transactionName: TransactionName.CreateHat });
}

export function useMintHat() {
  return useContractFunction(new Contract(HATS_PROTOCOL, HatsProtocolAbi), "mintHat", { transactionName: TransactionName.MintHat });
}
