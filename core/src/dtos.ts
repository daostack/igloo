import { ProposalTypeId } from './proposal.types';

export interface ProposalCreate<P = any> {
  type: ProposalTypeId;
  title: string;
  description: string;
  params?: P;
}

export interface ProposalCreateResponse {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProposalRead<P = any> extends ProposalCreate<P> {
  id: number;
}
