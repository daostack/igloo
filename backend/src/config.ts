/* eslint-disable 
  @typescript-eslint/no-unsafe-member-access, 
  @typescript-eslint/no-unsafe-call, 
  @typescript-eslint/no-var-requires */
import { WorldConfig } from '@igloo/core';

import { ExecutionConfig } from './services/TransitionService';

require('dotenv').config();

export const worldConfig: WorldConfig = {
  DISCOURSE_TOKEN: process.env.DISCOURSE_TOKEN,
  // TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
};

export const port = process.env.PORT;

export const config: ExecutionConfig = {
  world: worldConfig,
  transition: {
    period: 300,
  },
};

const chainConfig = new Map<
  number,
  {
    privateKey?: string;
    url?: string;
    chainName?: string;
    alchemyKey?: string;
  }
>();

chainConfig.set(1337, {
  url: process.env.JSON_RPC_URL_LOCAL,
});

export { chainConfig };
