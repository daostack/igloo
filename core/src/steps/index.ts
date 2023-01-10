import { Step } from '../types';

import { step as discourseDiscussion } from './dicourse-discussion/step';
import { step as snapshotVote } from './snapshot-vote/step';
import * as DISCOURSE_DISCUSSION_TYPES from './dicourse-discussion/types';

const stepsMap = new Map<string, Step>();

stepsMap.set(discourseDiscussion.id, discourseDiscussion);
stepsMap.set(snapshotVote.id, snapshotVote);

export { stepsMap, DISCOURSE_DISCUSSION_TYPES };
