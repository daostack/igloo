import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SNAPSHOT_JS_URI_TESTNET } from "./constants";

export const snapshotJSClient = new ApolloClient({
  uri: SNAPSHOT_JS_URI_TESTNET,
  cache: new InMemoryCache,
})
