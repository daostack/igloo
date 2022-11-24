export interface Space {
  id: string
  name: string
}

// TODO: check all possible proposal states
type ProposalState = "active" | "closed" | "pending";

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
}

export interface VotingPower {
  vp: number
}

export interface Votes {
  choice: number
}
