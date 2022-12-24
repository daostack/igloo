/**
 * NOTE: IN THE MEANTIME THERE ARE NO EXPOSABLE INTERFACES FROM SNAPSHOT.JS SO WE DEFINE THEM HERE.
 */

export interface Space {
  id: string
  name: string
  about: string
  network: string
  symbol: string
}

export enum ProposalState {
  Active = "active",
  Closed = "closed",
  Pending = "pending"
}

export interface Proposal {
  id: string
  title: string
  choices: string[]
  space: {
    id: string
  }
  state: ProposalState
  start: number
  end: number
  created: number
  body: string
}

export interface VotingPower {
  vp: number
}

export interface Votes {
  choice: number
}

export interface SnapshotError {
  error?: string
  error_description?: string
  code?: string
}

export interface SnapshotReceipt {
  id: string
  ipfs: string
  relayer: {
    address: string
    receipt: string
  }
}
