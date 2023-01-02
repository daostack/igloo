import { DISCOURSE_DISCUSSION_TYPES, ProposalCreate } from '@igloo/core';

import { ProposalController } from '../src/enpoints/ProposalController';
import { ServiceManager } from '../src/service.manager';
import { ExecutionConfig } from '../src/services/TransitionService';

jest.mock('../src/services/TimeService', () => {
  return {
    TimeService: jest.fn(() => {
      console.log('Mocking TimeService');
      let _now = 0;

      return {
        now: (): number => {
          return _now;
        },

        set: (n: number): void => {
          _now = n;
        },
      };
    }),
  };
});

describe('start', () => {
  let manager: ServiceManager;
  let proposalController: ProposalController;

  const user0 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  // const user1 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  // const user2 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
  // const user3 = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
  // const user4 = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';
  // const user5 = '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc';

  const creator = user0;

  beforeAll(async () => {
    const config: ExecutionConfig = {
      world: {
        DISCOURSE_TOKEN: '',
      },

      transition: { period: 30 },
    };

    manager = new ServiceManager(config);
    proposalController = new ProposalController(manager);

    await manager.resetDB();

    await manager.services.user.getOrCreate({
      address: creator,
    });
  });

  describe('create proposal', () => {
    const simDate = 1650000000;
    let create;
    let id: string;

    beforeAll(async () => {
      (manager.services.time as any).set(simDate);

      const details: ProposalCreate<DISCOURSE_DISCUSSION_TYPES.Params> = {
        title: 'test',
        description: 'test description',
        params: {
          discussionId: '',
          createDate: 0,
          duration: 10,
        },
        type: 'DISCOURSE_DISCUSSION',
      };
      const request: any = {
        body: {
          details,
        },
      };
      create = await proposalController.create(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        request,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        {} as any,
        () => {},
        creator
      );

      id = create.id;
    });

    test('is created', async () => {
      const request: any = {
        params: {
          id,
        },
      };
      const proposal = await proposalController.get(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        request,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        {} as any,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        creator
      );

      expect(proposal.id).toHaveLength(61);
    });
  });
});
