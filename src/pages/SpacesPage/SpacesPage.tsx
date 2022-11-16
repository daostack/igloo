import { useQuery } from "@apollo/client";
import { GET_SPACES } from "../../graphql/snapshot/queries";
import { Space } from "../../interfaces/snapshot";

export default function SpacesPage() {
  const { loading, data } = useQuery(GET_SPACES); // error
  const spaces = !loading && data.spaces.map((space: Space) => {
    return <li>id: {space.id} ; name: {space.name}</li>
  })

  return (
    <div>
      SPACES PAGE
      {loading && <span>LOADING SPACES...</span>}
      {!loading && (
        <ul>
          {spaces}
        </ul>
      )}
    </div>
  )
}
