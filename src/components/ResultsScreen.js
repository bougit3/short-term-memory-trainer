
import React from 'react';

function ResultsScreen({ results, onRestart, data, recallData }) {
  const checkMatch = (userVal, correctVal) => {
    return userVal && correctVal && userVal.toString().toLowerCase() === correctVal.toString().toLowerCase();
  };

  return (
    <div className="results-screen">
      <h2>Results</h2>
      {data.sequence.map((step, stepIdx) => (
        <div key={stepIdx}>
          <h3>Step {stepIdx + 1}</h3>
          {step.map((obj, objIdx) => {
            const userObj = recallData[stepIdx][objIdx];
            return (
              <div key={objIdx} className="result-object">
                <p>Object {objIdx + 1}:</p>
                <div className="attribute-row">
                  <span>Color: </span>
                  <div
                    className="color-indicator"
                    style={{ backgroundColor: obj.color || 'grey' }}
                  />
                  {checkMatch(userObj.color, obj.color) ? '✅' : `❌ (Correct: ${obj.color})`}
                </div>
                <div className="attribute-row">
                  <span>Number: </span>
                  <strong>{userObj.number || '-'}</strong>
                  {checkMatch(userObj.number, obj.number) ? '✅' : `❌ (Correct: ${obj.number})`}
                </div>
                <div className="attribute-row">
                  <span>Shape: </span>
                  <strong>{userObj.shape || '-'}</strong>
                  {checkMatch(userObj.shape, obj.shape) ? '✅' : `❌ (Correct: ${obj.shape})`}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={onRestart}>Try Again</button>
    </div>
  );
}

export default ResultsScreen;
