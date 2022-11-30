import { useEthers } from "@usedapp/core";
import { NavLink } from "react-router-dom";
import { HATS_IDS } from "../../data/hatsProtocolData";
import { useIsWearerOfHat } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";
import "./index.scss";

export default function NavLinks() {
  const { account } = useEthers();
  const isTopHat = useIsWearerOfHat(account, HATS_IDS.TopHat);

  return (
    <div className="nav-links">
      <NavLink to="/">LOGO</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : undefined} to={Routes.spaces}>Spaces</NavLink>
      {isTopHat && <NavLink to={Routes.admin}>Admin</NavLink>}
    </div>
  )
}
