import { useEthers } from "@usedapp/core";
import { NavLink } from "react-router-dom";
import { HATS_MAPPING } from "../../data/hatsProtocolData";
import { useIsTopHat } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";
import "./index.scss";

export default function NavLinks() {
  const { account } = useEthers();
  const isTopHat = useIsTopHat(account, HATS_MAPPING.get(account ?? ""));

  return (
    <div className="nav-links">
      <NavLink to="/">LOGO</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : undefined} to={Routes.spaces}>Spaces</NavLink>
      {isTopHat && <NavLink to={Routes.admin}>Admin</NavLink>}
    </div>
  )
}
