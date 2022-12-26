import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { t } from "i18next";
import { useParams } from "react-router";
import { Web3Provider } from "@ethersproject/providers";
import { snapshotClient } from "../../../../config/snapshot";
import { GET_PROPOSAL, GET_VOTES, GET_VOTING_POWER } from "../../../../graphql/snapshot/queries";
import { Proposal as IProposal, ProposalState, SnapshotError, Votes, VotingPower } from "../../../../interfaces/snapshot";
import { useToast } from "../../../../components/Toast";
import { fromUnixTime, getAppName } from "../../../../utils/utils";
import { useToggle } from "../../../../hooks/useToggle";
import Loading from "../../../../components/Loading/Loading";
import BackButton from "../../../../components/BackButton/BackButton";
import Steps, { Step, StepState } from "../../../../components/Steps/Steps";
import "./index.scss";

const MOCK_STEPS_DATA: Step[] = [
  {
    label: "Request for comments",
    description: "6 Days",
    state: StepState.Done
  },
  {
    label: "Temp Check",
    description: "8 Days",
    state: StepState.Done
  },
  {
    label: "Consensus check",
    description: "6 Days",
    state: StepState.Current
  },
  {
    label: "On-chain voting",
    description: "8 Days",
    state: StepState.Pending
  }
]

export default function Proposal() {
  const [loading, setLoading] = useToggle();
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
      setLoading(true);
      // TODO: handle the rest of the params
      await snapshotClient.vote(library as Web3Provider, account, {
        space: proposal.space.id,
        proposal: proposal.id,
        type: 'single-choice',
        choice: Number(choice),
        reason: '[ADD REASON TEXT HERE]',
        app: getAppName()
      });
      setLoading(false);
      toast.open(t("Proposal.vote-success"));
      refetchVotes();
    } catch (error) {
      setLoading(false);
      toast.open((error as SnapshotError)?.code || (error as SnapshotError)?.error_description);
    }
  }, [account, proposal, choice, library, refetchVotes, toast, setLoading])

  if (proposalError) return <span>{t("Shared.data-load-failed")}</span>
  if (proposalLoading || !proposal) return <span>{t("Shared.loading")}</span>

  return (
    <div className="proposal">
      <div className="proposal__top">
        <BackButton segments={2} />
      </div>
      <div className="proposal__content">
        <div className="proposal__content__data">
          <h3>{proposal.title}</h3>
          <p>{proposal.body}</p>
          <h6>{t("Proposal.your-vp")} {vpError ? t("Shared.data-load-failed") : vpLoading ? t("Shared.loading") : vp ? vp.vp : t("Shared.connect-your-wallet")}</h6>
          {proposal.state === ProposalState.Active ? (
            <>
              {!votesLoading && !votesError && (
                <select value={choice} onChange={e => setChoice(e.target.value)}>
                  {proposal.choices.map((choice, index) =>
                    <option key={index} value={index + 1}>{choice}</option>
                  )}
                </select>
              )}
              <button disabled={!account || !choice || vp?.vp === 0} onClick={vote}>{t("Proposal.vote")}</button>
            </>
          ) : proposal.state === ProposalState.Closed ? t("Proposal.vote-ended") : `${t("Proposal.vote-begins")} ${fromUnixTime(proposal.start)} `}
        </div>
        <div className="proposal__content__stage-container">
          <span>Created {fromUnixTime(proposal.created)}</span>
          <Steps data={MOCK_STEPS_DATA} />
        </div>
      </div>
      {loading && <Loading text={t("Shared.follow-wallet")!} />}
    </div>
  )
}
