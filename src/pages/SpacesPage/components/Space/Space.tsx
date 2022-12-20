import { useQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router"
import { Link } from "react-router-dom";
import { t } from "i18next";
import { GET_SPACE } from "../../../../graphql/snapshot/queries";
import { Routes } from "../../../../navigation/constants";
import "./index.scss";

export default function Space() {
  const { spaceId } = useParams();
  const { data: spaceData, error: spaceError, loading: spaceLoading } = useQuery(GET_SPACE, { variables: { spaceId: spaceId } });

  if (spaceError) return <span>{t("Shared.data-load-failed")}</span>
  if (spaceLoading) return <span>{t("Shared.loading")}</span>

  return (
    <div className="space">
      <div className="space__nav">
        <h4>{spaceData.space.name}</h4>
        <div className="space__nav__links">
          {/* TODO: need to understand who can create a proposal for each space and manifest this in the UI */}
          <Link to="create-proposal">{t("Space.create-proposal")}</Link>
          <span>About</span>
          <Link to={Routes.proposalsList}>Proposals</Link>
          <span>Delegations</span>
        </div>
      </div>

      <Outlet />
    </div>
  )
}
