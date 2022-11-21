export interface Space {
  id: string
  name: string
}

export interface Proposal {
  id: string
  title: string
  choices: string[];
  space: {
    id: string
  }
}

export interface VotingPower {
  vp: number
}

export interface Votes {
  choice: number
}
