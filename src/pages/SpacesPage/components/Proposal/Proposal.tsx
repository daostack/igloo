import { useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Web3Provider } from "@ethersproject/providers";
import { snapshotClient } from "../../../../config/snapshot";
import { GET_PROPOSAL, GET_VOTES, GET_VOTING_POWER } from "../../../../graphql/snapshot/queries";
import { Proposal as IProposal, Votes, VotingPower } from "../../../../interfaces/snapshot";
import { useToast } from "../../../../components/Toast";

export default function Proposal() {
  const toast = useToast();
  const { spaceId, proposalId } = useParams();
  const { account, library } = useEthers();
  const [choice, setChoice] = useState<string>();

  const { data: { proposal } = {}, error: proposalError, loading: proposalLoading } = useQuery<{ proposal: IProposal }>(GET_PROPOSAL,
    { variables: { proposalId: proposalId } });

  const { data: { vp } = {}, error: vpError, loading: vpLoading } = useQuery<{ vp: VotingPower }>(GET_VOTING_POWER,
    { skip: !account, variables: { voter: account, space: spaceId, proposal: proposalId } });

  const { data: { votes } = {}, error: votesError, loading: votesLoading, refetch: refetchVotes } = useQuery<{ votes: Votes[] }>(GET_VOTES,
    { skip: !account || !proposal, variables: { space: proposal?.space.id, voter: account, proposal: proposal?.id } });

  useEffect(() => {
    // TODO: better handle the case no vote has been made
    if (votes) setChoice(String(votes[0]?.choice || "1"));
  }, [votes])

  const vote = useCallback(async () => {
    if (!account || !proposal || !choice) return;
    try {
      // const receipt = 
      // TODO: handle the rest of the params
      await snapshotClient.vote(library as Web3Provider, account, {
        space: proposal.space.id,
        proposal: proposal.id,
        type: 'single-choice',
        choice: Number(choice),
        reason: '[ADD REASON TEXT HERE]',
        app: '[APP?]'
      });
      toast.open("Voting Success!")
      refetchVotes();
    } catch (error: any) { // TODO: better error type
      toast.open(error?.error_description || error?.code || error?.message);
    }
  }, [account, proposal, choice, library, refetchVotes, toast])

  if (proposalError) return <span>Failed loading proposal</span>
  if (proposalLoading) return <span>Loading...</span>

  return (
    <div>
      <h2>{proposal?.title}</h2>
      <h4>Voting Power: {vpError ? "Could not load voting power" : vpLoading ? "Loading..." : vp ? vp.vp : "Connect your wallet to reveal your voting power"}</h4>
      {proposal?.state === "active" ? (
        <>
          {!votesLoading && !votesError && (
            <select value={choice} onChange={e => setChoice(e.target.value)}>
              {proposal?.choices.map((choice, index) =>
                <option key={index} value={index + 1}>{choice}</option>
              )}
            </select>
          )}
          <button disabled={!account || !choice || vp?.vp === 0} onClick={vote}>Vote</button>
        </>
      ) : "This proposal has ended"}
    </div>
  )
}
