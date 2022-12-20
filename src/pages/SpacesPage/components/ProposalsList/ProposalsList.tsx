
import { useQuery } from "@apollo/client";
import { t } from "i18next";
import { useParams } from "react-router";
import { GET_SPACE_PROPOSALS } from "../../../../graphql/snapshot/queries";
import { Proposal } from "../../../../interfaces/snapshot";
import ProposalElement from "../ProposalElement/ProposalElement";
import "./index.scss";

export default function ProposalsList() {
  const { spaceId } = useParams();
  const { data: proposalsData, error: proposalsError, loading: proposalsLoading } = useQuery(GET_SPACE_PROPOSALS, { variables: { spaceId: spaceId } });

  if (proposalsError) return <span>{t("Shared.data-load-failed")}</span>
  if (proposalsLoading) return <span>{t("Shared.loading")}</span>

  const proposals = proposalsData.proposals.map((proposal: Proposal, index) => <ProposalElement key={index} proposal={proposal} />)

  return (
    <div className="proposals-list">
      {proposals.length === 0 ? <span>{t("Space.no-proposals")}</span> : proposals}
    </div>
  )
}
