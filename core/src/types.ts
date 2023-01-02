import { DiscourseConnector } from "./world/discourse/DiscourseConnector";

export type Step<P = any> = {
  id: string;
  transition: TransitionFunc<P>; 
  progress: ProgressInfo<P>;
  component: StepComponent<P>;
};


export interface ITimeService {
  now: () => number;
}

export interface IWorld {
  readonly discourse: DiscourseConnector;
  readonly time: ITimeService;
}

export interface StepProps<P = any> {
  params?: P;
}

export type StepComponent<P> = (
  props: StepProps<P>
) => JSX.Element;

export type ProgressInfo<P> = (params: P) => {
  title: string;
  summary: string;
}

export interface TransitionExecution {
  result: boolean;
}

export type TransitionFunc<P = any> = (
  world: IWorld,
  params: P
) => Promise<TransitionExecution>;

