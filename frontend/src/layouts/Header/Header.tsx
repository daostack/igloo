import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletBalance from "../../components/Wallet/WalletBalance/WalletBalance";
import WalletInfo from "../../components/Wallet/WalletInfo/WalletInfo";
import { Web3ModalButton } from "../../components/Wallet/Web3ModalButton/Web3ModalButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import Menu from "../Menu/Menu";
import "./index.scss";

export default function Header() {
  const breakpoint = useWindowSize();
  
  return (
    <header className="header">
      {breakpoint !== "mobile" && (
        <>
          <NavLinks />
          <LanguageSelector />
          <WalletInfo />
          <WalletBalance />
        </>
      )}
      <Web3ModalButton />
      {breakpoint === "mobile" && <Menu />}
    </header>
  )
}
