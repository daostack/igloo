/* eslint-disable unused-imports/no-unused-vars-ts */
import {
  randomShares,
  normalizeShares,
  RulesetExecutionOutput,
  IWorld,
} from '@commonvalue/rulesets';

export const shares = randomShares();

export class RulesetComputationMock {
  constructor(protected world: IWorld) {}

  runRuleset(
    rulesetId: string,
    params: any,
    state: any
  ): Promise<RulesetExecutionOutput<any>> {
    console.log({ shares });
    if (this.world.time.now() >= params.timeRange.end) {
      return Promise.resolve({
        executed: true,
        balances: normalizeShares(shares),
        nextExecutionTime: -1,
      });
    }

    return Promise.resolve({
      executed: false,
      nextExecutionTime: -1,
    });
  }

  getInitState(rulesetId: string, params: any): Promise<any> {
    return Promise.resolve({});
  }
}
