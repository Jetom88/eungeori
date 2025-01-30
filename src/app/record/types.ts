export enum Step {
  STEP1 = 0,
  STEP2,
  STEP3,
  STEP4,
}

export type StepChangeHandler = (newStep: Step) => void;
