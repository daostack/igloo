
import { Link } from "react-router-dom";
import { Proposal } from "../../../../interfaces/snapshot";
import { fromUnixTime } from "../../../../utils/utils";
import "./index.scss";

interface IProps {
  proposal: Proposal
}

export default function ProposalElement({ proposal }: IProps) {

  return (
    <div className="proposal-element">
      <Link to={`proposal/${proposal.id}`}>
        <b>{proposal.title}</b>
      </Link>
      <i><b>{proposal.state}</b> {`(${fromUnixTime(proposal.end)})`}</i>
    </div>
  )
}
