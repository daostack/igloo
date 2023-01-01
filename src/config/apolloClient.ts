import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloContext, IGLOO_SUBGRAPH, SNAPSHOT_SUBGRAPH, SNAPSHOT_JS_URI_TESTNET } from "./constants";

const iglooSubgraphLink = new HttpLink({
  uri: IGLOO_SUBGRAPH
});

const snapshotJSLink = new HttpLink({
  uri: `${SNAPSHOT_JS_URI_TESTNET}/graphql`
});

const snapshotSubgraphLink = new HttpLink({
  uri: SNAPSHOT_SUBGRAPH
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
  link: ApolloLink.split(operation =>
    operation.getContext().clientName === ApolloContext.IglooSubgraph,
    iglooSubgraphLink,
    ApolloLink.split(operation =>
      operation.getContext().clientName === ApolloContext.SnapshotJS,
      snapshotJSLink,
      snapshotSubgraphLink
    ))
});
