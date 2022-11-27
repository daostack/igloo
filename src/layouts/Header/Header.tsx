
import { useEtherBalance, useEthers } from "@usedapp/core";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletButton from "../../components/Wallet/WalletButton/WalletButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import { formatNumber } from "../../utils/utils";
import "./index.scss";

export default function Header() {
  const breakpoint = useWindowSize();
  const {account} = useEthers();
  const ethBalance = useEtherBalance(account);

  return (
    <header className="header">
      <NavLinks />
      <LanguageSelector />
      <WalletButton />
      {ethBalance && <span>{`ETH Balance: ${formatNumber(ethBalance)}`}</span>}
      {breakpoint === "mobile" && <span>MENU BUTTON</span>}
    </header>
  )
}
