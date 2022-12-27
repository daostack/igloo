import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloContext, IGLOO_SUBGRAPH, SNAPSHOT_URI_TESTNET } from "./constants";

const iglooSubgraphLink = new HttpLink({
  uri: IGLOO_SUBGRAPH
});

const snapshotLink = new HttpLink({
  uri: `${SNAPSHOT_URI_TESTNET}/graphql`
});

// TODO: better merge function with offset.
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          spaces: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
  link: ApolloLink.split(operation => operation.getContext().clientName === ApolloContext.IglooSubgraph, iglooSubgraphLink, snapshotLink)
});
