export interface Space {
  id: string
  name: string
}

type ProposalState = "active" | "closed";

export interface Proposal {
  id: string
  title: string
  choices: string[]
  space: {
    id: string
  }
  state: ProposalState
}

export interface VotingPower {
  vp: number
}

export interface Votes {
  choice: number
}
