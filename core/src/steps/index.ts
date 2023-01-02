import { Step } from '../types';

import { step as discourseDiscussion } from './dicourse-discussion/step';
import * as DISCOURSE_DISCUSSION_TYPES from './dicourse-discussion/types';

const stepsMap = new Map<string, Step>();

stepsMap.set(discourseDiscussion.id, discourseDiscussion);

export { stepsMap, DISCOURSE_DISCUSSION_TYPES };
