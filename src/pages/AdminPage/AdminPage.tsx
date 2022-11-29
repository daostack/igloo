import { useEthers } from "@usedapp/core";
import { Link, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { HATS_MAPPING } from "../../data/hatsProtocolData";
import { useIsTopHat, useName } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";
import "./index.scss";

export default function AdminPage() {
  const { account } = useEthers();
  const isTopHat = useIsTopHat(account, HATS_MAPPING.get(account ?? ""));
  const protocolVersion = useName();

  if (isTopHat === undefined) return <Loading />;
  if (isTopHat === false) return <Navigate to="/" />;

  return (
    <div className="admin-page">
      <h2>ADMIN PAGE</h2>
      <h4>{protocolVersion}</h4>
      <Link to={Routes.createHat}>Create Hat</Link>
      <Link to={Routes.mintHat}>Mint Hat</Link>
      <Outlet />
    </div>
  )
}
