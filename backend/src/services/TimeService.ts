import { ITimeService } from '@igloo/core';

export class TimeService implements ITimeService {
  now(): number {
    return Math.floor(Date.now() / 1000);
  }
}
