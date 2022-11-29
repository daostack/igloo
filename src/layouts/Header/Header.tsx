
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletBalance from "../../components/Wallet/WalletBalance/WalletBalance";
import WalletButton from "../../components/Wallet/WalletButton/WalletButton";
import WalletInfo from "../../components/Wallet/WalletInfo/WalletInfo";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./index.scss";

export default function Header() {
  const breakpoint = useWindowSize();

  return (
    <header className="header">
      <NavLinks />
      <LanguageSelector />
      <WalletButton />
      <WalletBalance />
      <WalletInfo />
      {breakpoint === "mobile" && <span>MENU BUTTON</span>}
    </header>
  )
}
