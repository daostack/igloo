import {
  ProposalCreateResponse,
  ProposalRead,
  ProposalCreate,
  proposalTypes,
  ProposalTypeId,
  TransitionExecution,
  stepsMap,
  IWorld,
} from '@igloo/core';
import { Prisma, Proposal, ProposalStep } from '@prisma/client';

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
    protected userService: UserService,
    protected world: IWorld
  ) {}

  async getDto(id: number): Promise<ProposalRead | undefined> {
    const proposal = await this.proposalsRepo.get(id);
    return {
      id: proposal.id,
      title: proposal.title,
      description: proposal.description,
      type: proposal.type as ProposalTypeId,
    };
  }

  async get(id: number): Promise<Proposal> {
    return this.proposalsRepo.get(id);
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

  async findPendingTransition(now: number): Promise<number[]> {
    return this.proposalsRepo.findNextTransitionLTE(now);
  }

  /** get the current proposal step */
  async getProposalStep(id: number): Promise<ProposalStep> {
    const proposal = await this.get(id);
    return this.proposalsRepo.getProposalStep(id, proposal.step);
  }

  async checkTransition(id: number): Promise<TransitionExecution> {
    const step = await this.getProposalStep(id);
    if (step.params === undefined) {
      throw new Error(
        `Step parameters undefined while checking for transition`
      );
    }

    const stepSpec = stepsMap.get(step.type);
    const result = await stepSpec.transition(this.world, step.params);

    if (result.executed && result.transition) {
      await this.proposalsRepo.setStep(id, step.order + 1);
    }

    return result;
  }
}
