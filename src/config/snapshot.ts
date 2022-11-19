import snapshot from '@snapshot-labs/snapshot.js';
import { SNAPSHOT_URI_TESTNET } from './constants';

const hub = SNAPSHOT_URI_TESTNET;
export const snapshotClient = new snapshot.Client712(hub);
