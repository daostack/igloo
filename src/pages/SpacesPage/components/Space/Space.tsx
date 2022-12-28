import { useQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router"
import { NavLink } from "react-router-dom";
import { t } from "i18next";
import { GET_SPACE } from "../../../../graphql/snapshot/queries";
import { Routes } from "../../../../navigation/constants";
import { ApolloContext } from "../../../../config/constants";
import "./index.scss";

export default function Space() {
  const { spaceId } = useParams();
  const { data: spaceData, error: spaceError, loading: spaceLoading } = useQuery(GET_SPACE,
    {
      variables: { spaceId: spaceId },
      context: { clientName: ApolloContext.Snapshot }
    });

  if (spaceError) return <span>{t("Shared.data-load-failed")}</span>
  if (spaceLoading) return <span>{t("Shared.loading")}</span>

  return (
    <div className="space">
      <div className="space__nav">
        <h4>{spaceData.space.name}</h4>
        <div className="space__nav__links">
          <span>About</span>
          <NavLink to={Routes.proposalsList}>Proposals</NavLink>
          <span>Delegations</span>
          <NavLink to={Routes.roles}>Roles</NavLink>
        </div>
      </div>
      <div className="space__outlet">
        <Outlet />
      </div>
    </div>
  )
}
