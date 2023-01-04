
import { Link } from "react-router-dom";
import { Proposal } from "../../../../interfaces/snapshot";
import ProposalState from "../ProposalState/ProposalState";
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
      <ProposalState proposal={proposal} />
    </div>
  )
}
