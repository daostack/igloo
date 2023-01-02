import { ITimeService, IWorld } from '../types';
import { DiscourseConnector } from './discourse/DiscourseConnector';

export interface WorldConfig {
  DISCOURSE_TOKEN?: string;
}

export class World implements IWorld {
  readonly discourse: DiscourseConnector;
  
  constructor(protected config: WorldConfig, readonly time: ITimeService) {
    this.discourse = new DiscourseConnector(config);
  }
}
