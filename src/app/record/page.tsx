'use client';

import { useState } from 'react';
import RecordPage from '.';
import TimePage from './(info)/time';
import ShapePage from './(info)/shape';
import DetailPage from './(info)/detail';
import usePageExitGuard from '../_hook/usePageExitGuard';
import { Step, StepChangeHandler } from './types';

const Page = () => {
  const [step, setStep] = useState<Step>(Step.STEP1);

  const handleButtonClick: StepChangeHandler = (step: Step) => {
    setStep(step);
  };

  usePageExitGuard(step !== 0);

  return (
    <>
      {step === Step.STEP1 && <RecordPage onButtonClick={handleButtonClick} />}
      {step === Step.STEP2 && <TimePage onButtonClick={handleButtonClick} />}
      {step === Step.STEP3 && <ShapePage onButtonClick={handleButtonClick} />}
      {step === Step.STEP4 && <DetailPage onButtonClick={handleButtonClick} />}
    </>
  );
};

export default Page;
