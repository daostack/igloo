import { Link } from "react-router-dom";
import { Space } from "../../../../interfaces/snapshot";
import { Routes } from "../../../../navigation/constants";
import "./index.scss";

interface IProps {
  space: Space
}

export default function SpaceElement({ space }: IProps) {

  return (
    <div className="space-element">
      <Link to={`${space.id}/${Routes.proposalsList}`}><b>{space.name}</b> {`(${space.symbol})`}</Link>
      <i>{space.about}</i>
    </div>
  )
}
