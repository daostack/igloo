import { IWorld, ProgressInfo, Step, TransitionFunc } from "../../types";
import { StepComponent } from "./component";

export interface Params {
  discussionId: string;
  duration: number;
  createDate: number;
}

const progress: ProgressInfo<Params> = (params: Params) =>  {
  const prettyDuration = params.duration;
  return {
    title: 'Discuss',
    summary: `Hold a ${prettyDuration} discussion on discourse`
  }
}

const transition: TransitionFunc = async (world: IWorld, params: Params) => {
  const thread = await world.discourse.getThread(params.discussionId);
  
  if(thread.length > 0 && world.time.now() > params.createDate + params.duration) {
    return {result: true};
  }

  return {result: false};
}

export const step: Step = {
  id: 'DISCOURSE_DISCUSSION',
  transition,
  progress,
  component: StepComponent
}