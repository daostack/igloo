import { Proposal, ProposalState as IProposalState } from "../../../../interfaces/snapshot";
import { fromUnixTime } from "../../../../utils/utils";

interface Props {
  proposal: Proposal
}

export default function ProposalState({ proposal }: Props) {

  // TODO: replace with i18next text
  const text = proposal.state === IProposalState.Active ? "Ends" : proposal.state === IProposalState.Pending ? "Starts" : "Ended";
  const value = proposal.state === IProposalState.Pending ? fromUnixTime(proposal.start) : fromUnixTime(proposal.end); 

  return (
    <span>
      <b><i>{proposal.state}</i></b>
      <i>{` (${text} ${value})`}</i>
    </span>
  )
}
