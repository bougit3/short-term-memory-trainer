
import React, { useEffect, useState } from 'react';

function TrainingScreen({ data, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex < data.sequence.length) {
      const currentStep = data.sequence[stepIndex];

      const speak = (text) => {
        if (data.mode !== 'visual') {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = data.audioSpeed;
          window.speechSynthesis.speak(utterance);
        }
      };

      const announceStep = () => {
        currentStep.forEach((obj, i) => {
          const parts = [];
          if (obj.color) parts.push(`Color: ${obj.color}`);
          if (obj.number !== null) parts.push(`Number: ${obj.number}`);
          if (obj.shape) parts.push(`Shape: ${obj.shape}`);
          speak(`Object ${i + 1}: ${parts.join(', ')}`);
        });
      };

      if (data.pauseMode) {
        announceStep();
      } else {
        announceStep();
        const timer = setTimeout(() => {
          setStepIndex(stepIndex + 1);
        }, data.timeDelay * 1000 + currentStep.length * 1500);
        return () => clearTimeout(timer);
      }
    } else {
      setTimeout(onComplete, 500);
    }
  }, [stepIndex, data, onComplete]);

  const currentObjects = data.sequence[stepIndex] || [];

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
      {data.pauseMode && (
        <button onClick={() => setStepIndex(stepIndex + 1)}>Next Step</button>
      )}
    </div>
  );
}

export default TrainingScreen;
