import { gql } from "@apollo/client";

export const GET_DELEGATIONS = gql`
  query Delegations($first: Int!) {
    delegations(first: $first) {
      id
      delegator
      space
      delegate
    }
  }
`
