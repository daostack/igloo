export enum ProposalTypeId {
  DiscourseAndSnapshot = 'DISCOURSE_AND_SNAPSHOT',
}

export enum StepTypeId {
  Discourse = 'DISCOURSE',
  Snapshot = 'SNAPSHOT',
}

export interface ProposalType {
  name: string;
  stepIds: string[];
}

const proposalTypes = new Map<ProposalTypeId, ProposalType>();

proposalTypes.set(ProposalTypeId.DiscourseAndSnapshot, {
  name: 'Discourse and Snapshot',
  stepIds: [StepTypeId.Discourse, StepTypeId.Snapshot],
});

export { proposalTypes };
