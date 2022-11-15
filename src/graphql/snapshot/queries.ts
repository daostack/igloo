import { gql } from "@apollo/client";

export const GET_SPACES = gql`
query Spaces {
  spaces(
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    name
  }
}
`;
