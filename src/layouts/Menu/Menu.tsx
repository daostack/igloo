import { t } from "i18next";
import { useEffect } from "react";
import HamburgerMenuIcon from "../../assets/icons/hamburger-menu.svg";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavLinks from "../../components/NavLinks/NavLinks";
import WalletBalance from "../../components/Wallet/WalletBalance/WalletBalance";
import WalletInfo from "../../components/Wallet/WalletInfo/WalletInfo";
import { useToggle } from "../../hooks/useToggle";
import "./index.scss";

export default function Menu() {
  const [showMenu, setShowMenu] = useToggle(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "initial";
    };
  }, [showMenu]);

  return (
    <div className="menu">
      <img onClick={setShowMenu} className="menu__hamburger-menu-icon" src={HamburgerMenuIcon} alt={t("Menu.hamburger-menu-alt")!} />
      {showMenu && (
        <div className="menu__content">
          <div onClick={setShowMenu}>
            <NavLinks />
          </div>
          <WalletInfo />
          <WalletBalance />
          <LanguageSelector />
        </div>
      )}
    </div>
  )
}
