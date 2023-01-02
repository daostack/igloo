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
  transitioning: Map<string, Promise<void>> = new Map();

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

    const incoming = await this.services.proposals.findPendingTransition(
      now + this.config.transition.period
    );

    appLogger.info(`Check Incoming Executions ${now}`);

    await Promise.all(
      incoming.map(async (id) => {
        await this.scheduleTransition(id, now);
      })
    );
  }

  async scheduleTransition(id: string, now: number): Promise<void> {}

  /** single point from which a campaign executed is triggered */
  async transition(uri: string, now: number): Promise<void> {
    /** reentrancy protection */
    const transitioning = this.transitioning.get(uri);
    if (transitioning !== undefined) {
      appLogger.info(`transitioning reentered ${uri}`);
      return transitioning;
    }

    const _execute = (async (): Promise<void> => {
      const campaign = await this.services.campaign.get(uri);

      if (campaign.nextExecDate >= now) {
        /** campaign not ready to be executed */
        appLogger.info(
          `campaign not ready to be executed now: ${now}, execData: 
          ${campaign.nextExecDate}`
        );
        return;
      }

      /** shares are computed */
      appLogger.info(`Executing ${uri}`);

      await this.services.campaign.runCampaign(uri, now);

      appLogger.info(`Executed ${uri}`);
    })();

    this.transitioning.set(uri, _execute);
    try {
      await _execute;
      this.transitioning.delete(uri);
    } catch (e) {
      this.transitioning.delete(uri);
    }
  }
}
