import { gql } from "@apollo/client";

export const GET_HATS = gql`
  query Hats($first: Int!) {
    hats(first: $first) {
      id
    }
  }
`
