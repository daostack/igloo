import { StepProps } from '../../types';

import { Params } from './step';

export const StepComponent = (props: StepProps<Params>): JSX.Element => {
  return (
    <div>
      <h2>
        Discourse Discussion{' '}
        {props && props.params ? props.params.discussionId : 'null'}
      </h2>
    </div>
  );
};
