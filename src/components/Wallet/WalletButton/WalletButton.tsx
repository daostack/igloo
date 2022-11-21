import { shortenIfAddress, useEthers } from "@usedapp/core";
import { t } from "i18next";
import "./index.scss";

export default function WalletButton() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return (
    <div className="wallet-button">
      {!account && <button onClick={() => activateBrowserWallet()}>{t('WalletButton.connect')}</button>}
      {account && <button onClick={() => deactivate()}>{t('WalletButton.disconnect')}</button>}
      {account && <span>{t('WalletButton.account')} {shortenIfAddress(account)}</span>}
    </div>
  )
}
