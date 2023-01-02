export interface ProposalCreate<P = any> {
  title: string;
  description: string;
  type: string;
  params: P;
}

export interface ProposalCreateResponse {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProposalRead<P = any> extends ProposalCreate<P> {
  id: string;
}
