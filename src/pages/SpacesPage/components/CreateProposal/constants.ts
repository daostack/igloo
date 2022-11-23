
export const PROPOSAL_TYPE = ['single-choice', 'approval' , 'quadratic' , 'ranked-choice' , 'weighted' , 'basic'] as const;
type ProposalType = typeof PROPOSAL_TYPE[number];

export interface CreateProposalForm {
  space: string
  type: ProposalType
  title: string
  body: string
  choices: string[]
  start: number
  end: number
  snapshot: number
  discussion: string
  plugins: string
  app: string
}

export const DESCRIPTION_MAX_LENGTH = 14400;
export const CHOICE_MAX_LENGTH = 32;
