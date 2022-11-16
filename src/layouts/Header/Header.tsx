
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletButton from "../../components/Wallet/WalletButton/WalletButton";
import "./index.scss";

export default function Header() {

  return (
    <header className="header">
      <NavLinks />
      <LanguageSelector />
      <WalletButton />
    </header>
  )
}
