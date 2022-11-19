import { useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { useParams } from "react-router";
import { GET_PROPOSAL, GET_VOTING_POWER } from "../../../../graphql/snapshot/queries";

export default function Proposal() {
  const { spaceId, proposalId } = useParams();
  const { account } = useEthers();
  const { data: proposalData, error: proposalError, loading: proposalLoading } = useQuery(GET_PROPOSAL,
    {
      variables: { proposalId: proposalId }
    });
  const { data: vpData, error: vpError, loading: vpLoading } = useQuery(GET_VOTING_POWER,
    {
      skip: !account, variables: { voter: account, space: spaceId, proposal: proposalId }
    });

  if (proposalError) return <span>Failed loading proposal</span>
  if (proposalLoading) return <span>Loading...</span>

  return (
    <div>
      <h2>{proposalData.proposal.title}</h2>
      <h4>Voting Power: {vpError ? "Could not load voting power" : vpLoading ? "Loading..." : vpData ? vpData.vp.vp : "Connect your wallet to reveal your voting power"}</h4>
    </div>
  )
}
