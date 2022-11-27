import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { GET_SPACES } from "../../graphql/snapshot/queries";
import { Space } from "../../interfaces/snapshot";
import "./index.scss";

const CHUNK_SIZE = 20;
const SKIP = 0;

export default function SpacesPage() {
  const { loading, error, data, fetchMore } = useQuery(GET_SPACES,
    {
      variables: {
        first: CHUNK_SIZE,
        skip: SKIP,
        orderBy: "created",
      },
    });

  if (error) return <span>{t("Shared.data-load-failed")}</span>;
  if (loading) return <span>{t("Shared.loading")}</span>

  const spaces = !loading && data.spaces.map((space: Space, index) =>
    <Link to={space.id} key={index}>{space.name}</Link>
  )

  return (
    <div className="spaces-page">
      <h2>SPACES PAGE</h2>
      <div className="spaces-page__spaces-container">
        {spaces}
        <button onClick={() => fetchMore({
          variables: {
            first: CHUNK_SIZE,
            skip: data.spaces.length
          }
        })}>Load more</button>
      </div>
    </div>
  )
}
