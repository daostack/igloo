import {
  ProposalCreateResponse,
  ProposalRead,
  ProposalCreate,
} from '@igloo/core';

import { ProposalRepository } from '../repositories/ProposalRepository';

import { TimeService } from './TimeService';
import { UserService } from './UserService';

export interface RootComputation {
  root: string;
  totalShareholders: number;
  totalInRoot: number;
  totalPending: number;
}

export interface CampaigServiceConfig {
  republishTimeMargin: number;
}

export class ProposalService {
  constructor(
    protected proposalsRepo: ProposalRepository,
    protected timeService: TimeService,
    protected userService: UserService
  ) {}

  async get(uri: string): Promise<ProposalRead | undefined> {
    const proposal = await this.proposalsRepo.get(uri);
    return {
      ...proposal,
    };
  }

  async create(data: ProposalCreate): Promise<ProposalCreateResponse> {
    const proposal = await this.proposalsRepo.create(data);
    return {
      id: proposal.id,
    };
  }
}
