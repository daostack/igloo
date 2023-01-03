import { PrismaClient, Prisma, Proposal, ProposalStep } from '@prisma/client';

export class ProposalRepository {
  constructor(protected client: PrismaClient) {}

  create(data: Prisma.ProposalCreateInput): Promise<Proposal> {
    return this.client.proposal.create({
      data,
    });
  }

  async get(id: number): Promise<Proposal> {
    return this.client.proposal.findUnique({ where: { id } });
  }

  async findNextTransitionLTE(now: number): Promise<number[]> {
    const proposals = await this.client.proposal.findMany({
      where: {
        nextTransitionCheck: {
          lte: now,
        },
      },
      select: {
        id: true,
      },
    });
    return proposals.map((p) => p.id);
  }

  async getProposalStep(
    id: number,
    step: number
  ): Promise<ProposalStep | undefined> {
    const stepRead = await this.client.proposalStep.findUnique({
      where: {
        proposalId_order: {
          proposalId: id,
          order: step,
        },
      },
    });
    return stepRead !== null ? stepRead : undefined;
  }

  async setStep(id: number, step: number): Promise<void> {
    await this.client.proposal.update({
      data: {
        step,
      },
      where: {
        id,
      },
    });
  }
}
