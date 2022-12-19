import { getChainName } from "@usedapp/core";
import { Link } from "react-router-dom";
import { Space } from "../../../../interfaces/snapshot";
import "./index.scss";

interface IProps {
  space: Space
}

export default function SpaceElement({ space }: IProps) {

  return (
    <div className="space-element">
      <Link to={space.id}><b>{space.name}</b> {`(${space.symbol})`}</Link>
      <p>{space.about}</p>
      <i>{getChainName(Number(space.network))}</i>
    </div>
  )
}
