import classNames from "classnames";
import "./index.scss";

export enum StepState {
  Current,
  Done,
  Pending
}

export interface Step {
  label: string
  description: string
  state: StepState
}

interface Props {
  data: Step[]
}

export default function Steps({ data }: Props) {

  const steps = data.map((step, index) => (
    <div key={index} className={classNames("step", {
      "current": step.state === StepState.Current,
      "done": step.state === StepState.Done,
      "pending": step.state === StepState.Pending
    })}>

      <div className="step__number">
        <b>{index + 1}</b>
      </div>

      <div className="step__content">
        <div>{step.label}</div>
        <div className="step__content__description">{step.description}</div>
      </div>
    </div>
  ))

  return (
    <div className="steps">
      {steps}
    </div>
  )
}
