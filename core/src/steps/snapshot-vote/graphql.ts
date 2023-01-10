import { gql } from "@apollo/client";

export const GET_PROPOSAL = gql`
  query Proposal($proposalId: String!) {
    proposal(id: $proposalId) {
      id
      title
      choices
      space {
        id
      }
      created
      state
      start
      end
      body
    }
  }
`
