
import { useEthers } from "@usedapp/core";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletBalance from "../../components/Wallet/WalletBalance/WalletBalance";
import WalletInfo from "../../components/Wallet/WalletInfo/WalletInfo";
import { Web3ModalButton } from "../../components/Wallet/Web3ModalButton/Web3ModalButton";
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
      <Web3ModalButton />
      <WalletBalance />
      {isTopHat ? "Admin" : <WalletInfo />}
      {breakpoint === "mobile" && <span>MENU BUTTON</span>}
    </header>
  )
}
