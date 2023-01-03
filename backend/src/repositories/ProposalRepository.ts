import { PrismaClient, Prisma, Proposal } from '@prisma/client';

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
}
