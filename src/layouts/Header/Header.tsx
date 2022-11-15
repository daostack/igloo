
import { shortenIfAddress, useEthers } from "@usedapp/core";
import { t } from "i18next";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import "./index.scss";

export default function Header() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  return (
    <header className="header">
      {!account && <button onClick={() => activateBrowserWallet()}>{t('connect')}</button>}
      {account && <button onClick={() => deactivate()}>{t('disconnect')}</button>}
      {account && <p>{t('account')} {shortenIfAddress(account)}</p>}
      <LanguageSelector />
    </header>
  )
}
