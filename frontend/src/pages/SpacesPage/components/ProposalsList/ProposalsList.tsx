
import { useQuery } from "@apollo/client";
import { t } from "i18next";
import { useState } from "react";
import { generatePath, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Tabs, { Tab } from "../../../../components/Tabs/Tabs";
import { ApolloContext } from "../../../../config/constants";
import { GET_SPACE_PROPOSALS } from "../../../../graphql/snapshot/snapshotJS";
import { Proposal, ProposalState } from "../../../../interfaces/snapshot";
import { Routes } from "../../../../navigation/constants";
import ProposalElement from "../ProposalElement/ProposalElement";
import "./index.scss";

const tabs: Tab[] = [
  {
    label: "Live",
    value: ProposalState.Active
  },
  {
    label: "Pending",
    value: ProposalState.Pending,
  },
  {
    label: "Archive",
    value: ProposalState.Closed
  }
]

export default function ProposalsList() {
  const { spaceId } = useParams();
  const [tab, setTab] = useState<ProposalState>(ProposalState.Active);

  const { data: proposalsData, error: proposalsError, loading: proposalsLoading } = useQuery(GET_SPACE_PROPOSALS,
    {
      variables:
      {
        spaceId: spaceId,
        state: tab
      },
      context: { clientName: ApolloContext.SnapshotJS }
    });

  const proposals = proposalsData?.proposals?.map((proposal: Proposal, index) => <ProposalElement key={index} proposal={proposal} />)

  return (
    <div className="proposals-list">
      <div className="proposals-list__top">
        <Tabs tabs={tabs} value={tab} onClick={setTab} />
        {/* TODO: need to understand who can create a proposal for each space and manifest this in the UI */}
        <NavLink to={`/${generatePath(Routes.createProposal, { spaceId: spaceId! })}`}>{t("ProposalsList.create-proposal")}</NavLink>
      </div>

      {proposalsError && <span>{t("Shared.data-load-failed")}</span>}
      {proposalsLoading && <span>{t("Shared.loading")}</span>}
      {proposals?.length === 0 ? <span>{t("Space.no-proposals")}</span> : proposals}
    </div >
  )
}
