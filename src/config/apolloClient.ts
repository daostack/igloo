import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SNAPSHOT_URI } from "./constants";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: SNAPSHOT_URI
});
