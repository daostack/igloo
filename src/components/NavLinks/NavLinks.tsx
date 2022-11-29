import { useEthers } from "@usedapp/core";
import { NavLink } from "react-router-dom";
import { HATS_IDS } from "../../data/hatsProtocolData";
import { useIsTopHat } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";

export default function NavLinks() {
  const { account } = useEthers();
  const isTopHat = useIsTopHat(account, HATS_IDS.TopHat);

  return (
    <div>
      <NavLink to="/">LOGO</NavLink>
      <NavLink to={Routes.spaces}>Spaces</NavLink>
      {isTopHat && <NavLink to={Routes.admin}>Admin</NavLink>}
    </div>
  )
}
