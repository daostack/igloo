import { Step } from "../types";
import { step as dicourse } from './dicourse-discussion/step';


const stepsMap = new Map<string, Step>();

stepsMap.set(dicourse.id, dicourse);