import { NavLink } from "react-router-dom";
import { Routes } from "../../navigation/constants";

export default function NavLinks(){
  return (
    <div>
      <NavLink to="/">LOGO</NavLink>
      <NavLink to={Routes.spaces}>Spaces</NavLink>
    </div>
  )
}
