import { useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { useParams } from "react-router";
import { snapshotJSClient } from "../../config/apolloClient";
import { StepProps } from "../../types";
import { GET_PROPOSAL, GET_VOTES, GET_VOTING_POWER } from "./graphql";
import { Params } from "./step";

export const StepComponent = (props: StepProps<Params>): JSX.Element => {
  const { account, library } = useEthers();

  const { spaceId, proposalId } = props.params!;

  const { data: { proposal } = {}, error, loading } = useQuery(GET_PROPOSAL,
    { client: snapshotJSClient, variables: { proposalId: proposalId } });

  const { data: { vp } = {}, error: vpError, loading: vpLoading } = useQuery(GET_VOTING_POWER,
    { skip: !account, client: snapshotJSClient, variables: { voter: account, space: spaceId, proposal: proposalId } });

  const { data: { votes } = {}, error: votesError, loading: votesLoading, refetch: refetchVotes } = useQuery(GET_VOTES,
    { skip: !account || !proposal, client: snapshotJSClient, variables: { space: spaceId, voter: account, proposal: proposalId } });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading proposal</span>;

  console.log(vp);
  console.log(votes);

  return (
    <div>
      <h3>{proposal.title}</h3>
    </div>
  )
}
