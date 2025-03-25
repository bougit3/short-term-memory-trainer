
import React, { useEffect, useState } from 'react';

function TrainingScreen({ data, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [objectIndex, setObjectIndex] = useState(0);
  const [isPlayingStep, setIsPlayingStep] = useState(false);

  useEffect(() => {
    if (stepIndex < data.sequence.length && !isPlayingStep) {
      setIsPlayingStep(true);
      const currentStep = data.sequence[stepIndex];

      const announceNextObject = (idx) => {
        if (idx >= currentStep.length) {
          setTimeout(() => {
            setIsPlayingStep(false);
            if (!data.pauseMode) {
              setStepIndex(stepIndex + 1);
            }
          }, 500);
          return;
        }
        const obj = currentStep[idx];
        if (data.mode !== 'visual') {
          const parts = [];
          if (obj.color) parts.push(`Color: ${obj.color}`);
          if (obj.number !== null) parts.push(`Number: ${obj.number}`);
          if (obj.shape) parts.push(`Shape: ${obj.shape}`);
          const utterance = new SpeechSynthesisUtterance(`Object ${idx + 1}: ${parts.join(', ')}`);
          utterance.rate = data.audioSpeed;
          utterance.onend = () => announceNextObject(idx + 1);
          window.speechSynthesis.speak(utterance);
        } else {
          // If only visual mode, just move to the next object with a timeout
          setTimeout(() => announceNextObject(idx + 1), data.timeDelay * 1000);
        }
      };

      announceNextObject(0);
    } else if (stepIndex >= data.sequence.length) {
      setTimeout(onComplete, 500);
    }
  }, [stepIndex, data, onComplete, isPlayingStep]);

  const currentObjects = data.sequence[stepIndex] || [];

  const handleNextStep = () => {
    setStepIndex(stepIndex + 1);
    setIsPlayingStep(false);
  };

  return (
    <div className="training-screen">
      <h2>Step {stepIndex + 1} of {data.sequence.length}</h2>
      {data.mode !== 'audio' && (
        <div className="visual-display">
          {currentObjects.map((obj, idx) => (
            <div key={idx} className={`visual-object ${obj.shape}`} style={{ backgroundColor: obj.color }}>
              {obj.number !== null ? <span>{obj.number}</span> : ''}
            </div>
          ))}
        </div>
      )}
      {data.pauseMode && !isPlayingStep && (
        <button onClick={handleNextStep}>Next Step</button>
      )}
    </div>
  );
}

export default TrainingScreen;
