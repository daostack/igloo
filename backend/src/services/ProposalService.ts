import {
  ProposalCreateResponse,
  ProposalRead,
  ProposalCreate,
  proposalTypes,
  ProposalTypeId,
  StepTypeId,
  stepsMap,
} from '@igloo/core';
import { Prisma } from '@prisma/client';

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

  async get(id: number): Promise<ProposalRead | undefined> {
    const proposal = await this.proposalsRepo.get(id);
    return {
      id: proposal.id,
      title: proposal.title,
      description: proposal.description,
      type: proposal.type as ProposalTypeId,
    };
  }

  async create(
    data: ProposalCreate,
    by: string
  ): Promise<ProposalCreateResponse> {
    const proposalType = proposalTypes.get(data.type);

    const createInput: Prisma.ProposalCreateInput = {
      step: 0,
      type: ProposalTypeId.DiscourseAndSnapshot,
      title: data.title,
      description: data.description,
      creator: {
        connectOrCreate: {
          where: {
            address: by,
          },
          create: {
            address: by,
          },
        },
      },
      steps: {
        createMany: {
          data: proposalType.stepIds.map((stepId, ix) => {
            return {
              order: ix,
              type: stepId,
              // The proposal create params are the first step parameters
              params: ix === 0 ? JSON.stringify(data.params) : undefined,
            };
          }),
        },
      },
    };

    const proposal = await this.proposalsRepo.create(createInput);
    return {
      id: proposal.id,
    };
  }
}
