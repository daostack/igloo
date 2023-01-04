import {
  DISCOURSE_DISCUSSION_TYPES,
  ProposalCreate,
  ProposalTypeId,
} from '@igloo/core';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

import { ProposalController } from '../src/enpoints/ProposalController';
import { UserController } from '../src/enpoints/UserController';
import { ServiceManager } from '../src/service.manager';
import { ExecutionConfig } from '../src/services/TransitionService';

const mnemonic =
  'decline payment stove label race pulse physical execute afford wish worry suspect uncover odor bridge';

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
  let userController: UserController;

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
    userController = new UserController(manager);

    await manager.resetDB();

    await manager.services.user.getOrCreate({
      address: creator,
    });
  });

  describe('login user', () => {
    beforeAll(async () => {});

    test('logs in', async () => {
      const session = {
        siwe: undefined,
        cookie: {},
      };
      /* eslint-disable */
      const me = await userController.me(
        {
          session,
        } as any,
        {} as any,
        () => {}
      );

      expect(me).toBeUndefined();

      const { nonce } = userController.nonce(
        {
          session,
        } as any,
        {} as any,
        () => {}
      );

      expect(typeof nonce).toBe('string');
      expect(nonce.length).toBeGreaterThan(0);

      const wallet = ethers.Wallet.fromMnemonic(mnemonic);

      const siwe = new SiweMessage({
        domain: 'test.com',
        address: wallet.address,
        statement: 'Login with my Ethereum account',
        uri: 'https://www.google.com/',
        version: '1',
        chainId: 1337,
        nonce,
      });

      const message = siwe.prepareMessage();
      const signature = await wallet.signMessage(message);

      const { user } = await userController.verify(
        {
          body: {
            message,
            signature,
          },
          session,
        } as any,
        {} as any,
        () => {}
      );

      console.log({ session });
      expect(user.address).toBe(wallet.address);

      /* eslint-enable */
    });
  });

  describe('create proposal', () => {
    const simDate = 1650000000;
    let create;
    let id: string;

    beforeAll(async () => {
      /* eslint-disable */
      (manager.services.time as any).set(simDate);

      const details: ProposalCreate<DISCOURSE_DISCUSSION_TYPES.Params> = {
        type: ProposalTypeId.DiscourseAndSnapshot,
        title: 'test',
        description: 'test description',
        params: {
          discussionId: '',
          createDate: 0,
          duration: 10,
        },
      };
      const request: any = {
        body: {
          details,
        },
      };
      create = await proposalController.create(
        request,
        {} as any,
        () => {},
        creator
      );

      id = create.id;
      /* eslint-enable */
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

      expect(typeof proposal.id).toBe('number');
    });
  });
});
