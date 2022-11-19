import { useQuery } from "@apollo/client";
import { useEthers, useTransactions } from "@usedapp/core";
import { useCallback } from "react";
import { useParams } from "react-router";
import { Web3Provider } from "@ethersproject/providers";
import { snapshotClient } from "../../../../config/snapshot";
import { GET_PROPOSAL, GET_VOTING_POWER } from "../../../../graphql/snapshot/queries";
import { Proposal as IProposal, VotingPower } from "../../../../interfaces/snapshot";

export default function Proposal() {
  const transactions = useTransactions();
  console.log(transactions)
  const { spaceId, proposalId } = useParams();
  const { account, library } = useEthers();
  const { data: { proposal } = {}, error: proposalError, loading: proposalLoading } = useQuery<{ proposal: IProposal }>(GET_PROPOSAL,
    { variables: { proposalId: proposalId } });

  const { data: { vp } = {}, error: vpError, loading: vpLoading } = useQuery<{ vp: VotingPower }>(GET_VOTING_POWER,
    { skip: !account, variables: { voter: account, space: spaceId, proposal: proposalId } });

  const vote = useCallback(async () => {
    if (!account || !proposal) return;
    try {
      // TODO: call via usedapp interface? probably no need because we just need to sign the transaction.
      const receipt = await snapshotClient.vote(library as Web3Provider, account, {
        space: `${proposal.space.id}`,
        proposal: proposal.id,
        type: 'single-choice',
        choice: 1,
        reason: 'Choice 1 make lot of sense',
        app: 'my-app'
      });
      console.log(receipt);
    } catch (error) {
      // TODO: display on the UI
      console.log(error);
    }
  }, [account, proposal])

  if (proposalError) return <span>Failed loading proposal</span>
  if (proposalLoading) return <span>Loading...</span>

  return (
    <div>
      <h2>{proposal?.title}</h2>
      <h4>Voting Power: {vpError ? "Could not load voting power" : vpLoading ? "Loading..." : vp ? vp.vp : "Connect your wallet to reveal your voting power"}</h4>
      <button disabled={!account} onClick={vote}>Vote</button>
    </div>
  )
}
