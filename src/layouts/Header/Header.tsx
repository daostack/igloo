
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletButton from "../../components/Wallet/WalletButton/WalletButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./index.scss";

export default function Header() {
  const breakpoint = useWindowSize();

  return (
    <header className="header">
      <NavLinks />
      <LanguageSelector />
      <WalletButton />
      {breakpoint === "mobile" && <span>MENU BUTTON</span>}
    </header>
  )
}
