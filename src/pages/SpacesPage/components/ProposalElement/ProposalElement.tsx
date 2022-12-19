
import { Proposal } from "../../../../interfaces/snapshot";
import "./index.scss";

interface IProps {
  proposal: Proposal
}

export default function ProposalElement({ proposal }: IProps) {

  return (
    <div className="proposal-element">
      proposal element
    </div>
  )
}
