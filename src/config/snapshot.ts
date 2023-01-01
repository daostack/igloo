import snapshot from '@snapshot-labs/snapshot.js';
import { SNAPSHOT_JS_URI_TESTNET } from './constants';

const hub = SNAPSHOT_JS_URI_TESTNET;
export const snapshotClient = new snapshot.Client712(hub);
