import { Link, Outlet } from "react-router-dom";
import { useName } from "../../hooks/hatsProtocol/contractHooks";
import { Routes } from "../../navigation/constants";
import "./index.scss";

export default function AdminPage() {
  const protocolVersion = useName();

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
