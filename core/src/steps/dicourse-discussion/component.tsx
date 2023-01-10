import { useCallback } from 'react';
import { AsyncStatus, useAsync } from '../../hooks/useAsync';
import { StepProps } from '../../types';
import { getTopic } from './api';
import { Params } from './step';

export const StepComponent = (props: StepProps<Params>): JSX.Element => {
  const topicId = props?.params?.discussionId;

  const getTopicCallback = useCallback(async () => {
    if (!topicId) return;
    return await getTopic(topicId);
  }, [topicId])

  const { status, value: topic, error } = useAsync(getTopicCallback);

  if (error) return <span>{error.code}: {error?.message}</span>;
  if (status === AsyncStatus.Pending) return <span>Loading...</span>;

  return (
    <div>
      {`Discourse Discussion ${props?.params ? props.params.discussionId : 'null'}`}
      <h2>{topic?.title}</h2>
      <h6>Created {topic?.created_at} by {topic?.details.created_by.name}</h6>
    </div>
  );
};
