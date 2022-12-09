import { useQuery } from "@apollo/client";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { t } from "i18next";
import { GET_SPACE, GET_SPACE_PROPOSALS } from "../../../../graphql/snapshot/queries";
import { Proposal } from "../../../../interfaces/snapshot";
import "./index.scss";

export default function Space() {
  const { spaceId } = useParams();
  const { data: spaceData, error: spaceError, loading: spaceLoading } = useQuery(GET_SPACE, { variables: { spaceId: spaceId } });
  const { data: proposalsData, error: proposalsError, loading: proposalsLoading } = useQuery(GET_SPACE_PROPOSALS, { variables: { spaceId: spaceId } });

  if (spaceError || proposalsError) return <span>{t("Shared.data-load-failed")}</span>
  if (spaceLoading || proposalsLoading) return <span>{t("Shared.loading")}</span>

  const proposals = proposalsData.proposals.map((proposal: Proposal, index) =>
    <Link to={`proposal/${proposal.id}`} key={index}>{proposal.title}</Link>
  )

  return (
    <div className="space">
      <h2>{spaceData.space.name}</h2>
      {/* TODO: need to understand who can create a proposal for each space and manifest this in the UI */}
      <Link to="create-proposal">{t("Space.create-proposal")}</Link>
      <div className="space__proposals-container">
        {proposals.length === 0 ? <span>{t("Space.no-proposals")}</span> : proposals}
      </div>
    </div>
  )
}
