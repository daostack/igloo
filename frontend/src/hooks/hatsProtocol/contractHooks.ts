import { useCall, useCalls, useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import { CHAIN_ID, HATS_PROTOCOL } from "../../config/env";
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

// export function useIsTopHat(account: string | undefined, hatId: string | undefined): boolean | undefined {
//   const { value, error } = useCall(account && {
//     contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
//     method: 'isTopHat',
//     args: [hatId]
//   }) ?? {}
//   if (error) {
//     console.error(error.message);
//     return undefined;
//   }
//   return value?.[0];
// }

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

export function useIsWearerOfHats(account: string | undefined, hatIds: string[]): (boolean | undefined)[] {

  const calls = hatIds.map(hatId => ({
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'isWearerOfHat',
    args: [account, hatId]
  })) ?? []

  const results = useCalls(account ? calls : []) ?? [];
  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(`Error calling isWearerOfHat on ${calls[index]?.contract.address}: ${result.error.message}`);
    }
  })
  return results.map(result => result?.value?.[0]);
}

export function useViewHats(hatIds: string[]): (Hat | undefined)[] {
  const calls = hatIds.map(hatId => ({
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'viewHat',
    args: [hatId]
  })) ?? []

  const results = useCalls(hatIds ? calls : [], { chainId: CHAIN_ID }) ?? [];
  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(`Error calling viewHat on ${calls[index]?.contract.address}: ${result.error.message}`);
    }
  })
  return results.map(result => result?.value);
}

export function useViewHat(hatId: string | undefined): Hat | undefined {
  const { value, error } = useCall(hatId && {
    contract: new Contract(HATS_PROTOCOL, HatsProtocolAbi),
    method: 'viewHat',
    args: [hatId]
  }, { chainId: CHAIN_ID }) ?? {}
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
