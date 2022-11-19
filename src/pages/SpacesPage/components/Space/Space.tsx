import { useQuery } from "@apollo/client";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { GET_SPACE, GET_SPACE_PROPOSALS } from "../../../../graphql/snapshot/queries";
import { Proposal } from "../../../../interfaces/snapshot";
import { Routes } from "../../../../navigation/constants";

export default function Space() {
  const { spaceId } = useParams();
  const { data: spaceData, error: spaceError, loading: spaceLoading } = useQuery(GET_SPACE, { variables: { spaceId: spaceId } });
  const { data: proposalsData, error: proposalsError, loading: proposalsLoading } = useQuery(GET_SPACE_PROPOSALS, { variables: { spaceId: spaceId } });

  if (spaceError || proposalsError) return <span>Failed loading space</span>
  if (spaceLoading || proposalsLoading) return <span>Loading...</span>

  const proposals = proposalsData.proposals.map((proposal: Proposal, index) => {
    return <Link to={`${Routes.spaces}/${spaceId}/proposal/${proposal.id}`} key={index}>{proposal.title}</Link>
  })

  return (
    <div>
      <h2>{spaceData.space.name}</h2>
      <ul>
        {proposals.length === 0 ? <span>No Proposals</span> : proposals}
      </ul>
    </div>
  )
}
