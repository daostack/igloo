import { StepProps } from "../../types"
import { Params } from "./step"

export const StepComponent = (props: StepProps): JSX.Element => {
  return (<div>Discussion {props.params.discussionId}</div>)
}