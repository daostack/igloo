import { useQuery } from "@apollo/client";
import { t } from "i18next";
import { ApolloContext } from "../../config/constants";
import { GET_SPACES } from "../../graphql/snapshot/queries";
import { Space } from "../../interfaces/snapshot";
import SpaceElement from "./components/SpaceElement/SpaceElement";
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
      context: { clientName: ApolloContext.Snapshot }
    });

  if (error) return <span>{t("Shared.data-load-failed")}</span>;
  if (loading) return <span>{t("Shared.loading")}</span>

  const spaces = !loading && data.spaces.map((space: Space, index) => <SpaceElement space={space} key={index} />)

  return (
    <div className="spaces-page">
      <h2>Snapshot Spaces</h2>
      <div className="spaces-page__spaces-container">
        {spaces}
        {/* TODO: show loader when loading more - and disable the button */}
        <button onClick={() => fetchMore({
          variables: {
            first: CHUNK_SIZE,
            skip: data.spaces.length
          }
        })}>{t("Shared.load-more")}</button>
      </div>
    </div>
  )
}
