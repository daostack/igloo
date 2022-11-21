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
    id
    title
  }
}
`

export const GET_PROPOSAL = gql`
  query Proposal($proposalId: String!) {
    proposal(id: $proposalId) {
      id
      title
      choices
      space {
        id
      }
    }
  }
`

export const GET_VOTING_POWER = gql`
  query VotingPower($voter: String!, $space: String!, $proposal: String!) {
    vp(voter: $voter, space: $space, proposal: $proposal) {
      vp
      vp_by_strategy
      vp_state
    }
  }
`

export const GET_VOTES = gql`
  query Votes($space: String!, $voter: String!, $proposal: String!) {
    votes(where: {space: $space, voter: $voter, proposal: $proposal}) {
      choice
    }
  }
`