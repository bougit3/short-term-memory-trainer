import React, { useState } from 'react';

function RecallScreen({ data, onSubmit }) {
  const [recallData, setRecallData] = useState(
    data.sequence.map(step => step.map(() => ({
      color: '',
      number: '',
      shape: ''
    })))
  );

  const handleChange = (stepIdx, objIdx, field, value) => {
    const updated = [...recallData];
    updated[stepIdx][objIdx][field] = value;
    setRecallData(updated);
  };

  return (
    <div className="recall-screen">
      <h2>Recall Phase</h2>
      <p>Enter the attributes you remember for each object at each step:</p>
      {recallData.map((step, stepIdx) => (
        <div key={stepIdx}>
          <h3>Step {stepIdx + 1}</h3>
          {step.map((obj, objIdx) => (
            <div key={objIdx} className="recall-object">
              <p>Object {objIdx + 1}:</p>
              {data.sequence[0][objIdx].color !== null && (
                <input
                  type="text"
                  placeholder="Color"
                  value={obj.color}
                  onChange={(e) => handleChange(stepIdx, objIdx, 'color', e.target.value)}
                />
              )}
              {data.sequence[0][objIdx].number !== null && (
                <input
                  type="number"
                  placeholder="Number"
                  value={obj.number}
                  onChange={(e) => handleChange(stepIdx, objIdx, 'number', e.target.value)}
                />
              )}
              {data.sequence[0][objIdx].shape !== null && (
                <input
                  type="text"
                  placeholder="Shape"
                  value={obj.shape}
                  onChange={(e) => handleChange(stepIdx, objIdx, 'shape', e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => onSubmit(recallData)}>Submit Answers</button>
    </div>
  );
}

export default RecallScreen;