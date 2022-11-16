import { shortenIfAddress, useEthers } from "@usedapp/core";
import { t } from "i18next";
import "./index.scss";

export default function WalletButton() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return (
    <div className="wallet-button">
      {!account && <button onClick={() => activateBrowserWallet()}>{t('connect')}</button>}
      {account && <button onClick={() => deactivate()}>{t('disconnect')}</button>}
      {account && <span>{t('account')} {shortenIfAddress(account)}</span>}
    </div>
  )
}
