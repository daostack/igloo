import { useEffect } from "react";
import Web3Modal from 'web3modal';
import { shortenIfAddress, useEthers, useLookupAddress } from "@usedapp/core";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useToast } from "../../Toast";
import { t } from "i18next";
import { ENDPOINTS } from "../../../config/env";
import "./index.scss";

export const Web3ModalButton = () => {
  const { account, activate, deactivate, error } = useEthers();
  const { ens } = useLookupAddress(account);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast.open(error.message);
    }
  }, [error, toast])

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: ENDPOINTS
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (error) {
      toast.open(error instanceof Error ? error.message : t("Shared.general-error"));
    }
  }

  return (
    <div className="web3-modal-button">
      {account ? (
        <>
          <span>{ens ?? shortenIfAddress(account)}</span>
          <button onClick={() => deactivate()}>{t("Web3ModalButton.disconnect")}</button>
        </>
      ) : <button onClick={activateProvider}>{t("Web3ModalButton.connect")}</button>}
    </div>
  )
}
