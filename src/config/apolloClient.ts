import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SNAPSHOT_URI_TESTNET } from "./constants";

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
  uri: `${SNAPSHOT_URI_TESTNET}/graphql`
});
