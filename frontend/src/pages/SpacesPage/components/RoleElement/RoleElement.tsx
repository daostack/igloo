
import { Link } from "react-router-dom";
import { Hat } from "../../../../interfaces/hatsProtocol";
import "./index.scss";

interface Props {
  roleId: string
  role: Hat
}

export default function RoleElement({ roleId, role }: Props) {

  return (
    <div className="role-element">
      <span>🧢</span>
      <Link to={`role/${roleId}`}>
        <b>{role?.details}</b>
      </Link>
    </div>
  )
}
