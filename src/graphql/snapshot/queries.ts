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

export const GET_SPACE = gql`
  query Space($spaceId: String!) {
    space(id: $spaceId) {
      name
    }
  }
`

export const GET_SPACE_PROPOSALS = gql`
query SpaceProposals($spaceId: String!) {
  proposals(where: { space_in: [$spaceId] }) {
    title
  }
}
`