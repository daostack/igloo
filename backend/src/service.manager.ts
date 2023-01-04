import { IWorld, World } from '@igloo/core';
import { PrismaClient } from '@prisma/client';

import { ProposalRepository } from './repositories/ProposalRepository';
import { UserRepository } from './repositories/UserRepository';
import { ReadDataService } from './services/onchain/ReadDataService';
import { ProposalService } from './services/ProposalService';
import { TimeService } from './services/TimeService';
import { ExecutionConfig } from './services/TransitionService';
import { UserService } from './services/UserService';
import { Services } from './types';

// const LOG = ['query', 'info', 'warn', 'error'];
const LOG = ['warn', 'error'];

// const wallet = ethers.Wallet.createRandom();
// console.log('wallet', { privateKey: wallet.privateKey });

export class ServiceManager {
  public client: PrismaClient;

  public proposalRepo: ProposalRepository;
  public userRepo: UserRepository;

  public world: IWorld;

  private userService: UserService;
  private timeService: TimeService;
  private readDataService: ReadDataService;

  private proposalService: ProposalService;
  public services: Services;

  constructor(config: ExecutionConfig) {
    const url = process.env.POSTGRES_URL;

    this.client = new PrismaClient({
      log: LOG as any,
      datasources: { db: { url } },
    });

    this.proposalRepo = new ProposalRepository(this.client);
    this.userRepo = new UserRepository(this.client);
    this.timeService = new TimeService();
    this.world = new World(config.world, this.timeService);

    this.userService = new UserService(this.userRepo);

    this.proposalService = new ProposalService(
      this.proposalRepo,
      this.timeService,
      this.userService,
      this.world
    );

    this.services = {
      proposal: this.proposalService,
      user: this.userService,
      time: this.timeService,
      readDataService: this.readDataService,
    };
  }

  /** for testing only */
  async resetDB(): Promise<void> {
    await this.client.$executeRaw`
      TRUNCATE 
        public."Proposal", 
        public."ProposalStep", 
        public."User"
    `;
  }
}
