import { WorldConfig } from '@igloo/core';

import { appLogger } from '../logger';
import { Services } from '../types';

export interface ExecutionConfig {
  world: WorldConfig;
  transition: {
    period: number;
  };
}

export class TransitionService {
  transitionCicle: NodeJS.Timer;
  transitioning: Map<number, Promise<void>> = new Map();

  constructor(
    protected services: Services,
    protected config: ExecutionConfig
  ) {}

  startTransitionWatcher(): void {
    void this.checkTransition();
    this.transitionCicle = setInterval(() => {
      void this.checkTransition();
    }, this.config.transition.period * 1000);
  }

  async checkTransition(): Promise<void> {
    const now = this.services.time.now();

    const incoming = await this.services.proposal.findPendingTransition(
      now + this.config.transition.period
    );

    appLogger.info(`Check Incoming Executions ${now}`);

    await Promise.all(
      incoming.map(async (id) => {
        await this.scheduleTransition(id, now);
      })
    );
  }

  async scheduleTransition(id: number, now: number): Promise<void> {}

  /** single point from which a campaign executed is triggered */
  async transition(id: number, now: number): Promise<void> {
    /** reentrancy protection */
    const transitioning = this.transitioning.get(id);
    if (transitioning !== undefined) {
      appLogger.info(`transitioning reentered ${id}`);
      return transitioning;
    }

    const check = (async (): Promise<void> => {
      const proposal = await this.services.proposal.get(id);

      if (proposal.nextTransitionCheck >= now) {
        /** campaign not ready to be executed */
        appLogger.info(
          `proposal not ready to check transition: ${now}, execData: 
          ${proposal.nextTransitionCheck}`
        );
        return;
      }

      /** shares are computed */
      appLogger.info(`Checking transition ${id}`);

      await this.services.proposal.checkTransition(id);

      appLogger.info(`Checking transition ${id}`);
    })();

    this.transitioning.set(id, check);
    try {
      await check;
      this.transitioning.delete(id);
    } catch (e) {
      this.transitioning.delete(id);
    }
  }
}
