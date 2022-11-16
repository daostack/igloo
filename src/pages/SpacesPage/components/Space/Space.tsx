import { useQuery } from "@apollo/client";
import { useParams } from "react-router"
import { GET_SPACE, GET_SPACE_PROPOSALS } from "../../../../graphql/snapshot/queries";
import { Proposal } from "../../../../interfaces/snapshot";

export default function Space() {
  const { spaceId } = useParams();
  const { data: spaceData, error: spaceError, loading: spaceLoading } = useQuery(GET_SPACE, { variables: { spaceId: spaceId } });
  const { data: proposalsData, error: proposalsError, loading: proposalsLoading } = useQuery(GET_SPACE_PROPOSALS, { variables: { spaceId: spaceId } });

  if (spaceError || proposalsError) return <span>Failed loading space</span>
  if (spaceLoading || proposalsLoading) return <span>Loading...</span>

  const proposals = proposalsData.proposals.map((proposal: Proposal, index) => {
    return <li key={index}>{proposal.title}</li>
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
