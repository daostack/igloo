import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SNAPSHOT_URI_TESTNET } from "./constants";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: SNAPSHOT_URI_TESTNET
});
