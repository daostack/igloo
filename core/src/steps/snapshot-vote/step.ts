import { StepTypeId } from "../../proposal.types";
import { IWorld, ProgressInfo, Step, TransitionFunc } from "../../types";
import { StepComponent } from "./component";

export interface Params {
  proposalId: string;
  start: number;
}

const progress: ProgressInfo<Params> = (params: Params) => {
  const prettyStart = params.start;
  return {
    title: 'Vote',
    summary: `Starts ${prettyStart}`,
  };
};

const transition: TransitionFunc = async (world: IWorld, params: Params) => {
  const thread = await world.discourse.getThread(params.proposalId);

  if (
    thread.length > 0 &&
    world.time.now() > params.start // add two days for example
  ) {
    return { executed: true, transition: true };
  }

  return { executed: true, transition: false };
};

export const step: Step<Params> = {
  id: StepTypeId.Snapshot,
  transition,
  progress,
  component: StepComponent,
};
