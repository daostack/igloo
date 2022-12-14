import { useEthers } from "@usedapp/core";
import { NavLink } from "react-router-dom";
import { TOP_HAT_ID } from "../../data/hatsProtocolData";
import { useIsWearerOfHat } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";
import "./index.scss";

export default function NavLinks() {
  const { account } = useEthers();
  const isTopHat = useIsWearerOfHat(account, TOP_HAT_ID);

  return (
    <div className="nav-links">
      <NavLink to="/">Igloo</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : undefined} to={Routes.spaces}>Spaces</NavLink>
      <NavLink to={Routes.discourse}>Discourse</NavLink>
      {isTopHat && <NavLink to={Routes.admin}>Admin</NavLink>}
    </div>
  )
}
