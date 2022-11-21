import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_SPACES } from "../../graphql/snapshot/queries";
import { Space } from "../../interfaces/snapshot";
import "./index.scss";

export default function SpacesPage() {
  const { loading, error, data } = useQuery(GET_SPACES);
  if (error) return <span>Failed loading spaces</span>;
  if (loading) return <span>Loading...</span>

  const spaces = !loading && data.spaces.map((space: Space, index) =>
    <Link to={space.id} key={index}>{space.name}</Link>
  )

  return (
    <div className="spaces-page">
      <h2>SPACES PAGE</h2>
      <div className="spaces-page__spaces-container">
        {spaces}
      </div>
    </div>
  )
}
