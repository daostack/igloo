
import { useEthers } from "@usedapp/core";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletBalance from "../../components/Wallet/WalletBalance/WalletBalance";
import WalletButton from "../../components/Wallet/WalletButton/WalletButton";
import WalletInfo from "../../components/Wallet/WalletInfo/WalletInfo";
import { TOP_HAT_ID } from "../../data/hatsProtocolData";
import { useIsWearerOfHat } from "../../hooks/hatsProtocol/contractHooks";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./index.scss";

export default function Header() {
  const breakpoint = useWindowSize();
  const { account } = useEthers();
  const isTopHat = useIsWearerOfHat(account, TOP_HAT_ID);

  return (
    <header className="header">
      <NavLinks />
      <LanguageSelector />
      <WalletButton />
      <WalletBalance />
      {isTopHat ? "Admin" : <WalletInfo />}
      {breakpoint === "mobile" && <span>MENU BUTTON</span>}
    </header>
  )
}
