import { WorldConfig } from '../World';

export class DiscourseConnector {
  constructor(protected config: WorldConfig) {}

  async getThread(threadId: String): Promise<string[]> {
    return [];
  }
}
