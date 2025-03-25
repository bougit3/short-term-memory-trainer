import React, { useState } from 'react';

function Settings({ onStart }) {
  const [numObjects, setNumObjects] = useState(3);
  const [sequenceLength, setSequenceLength] = useState(5);
  const [useColors, setUseColors] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useShapes, setUseShapes] = useState(false);
  const [orderMatters, setOrderMatters] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [pauseMode, setPauseMode] = useState(false);
  const [timeDelay, setTimeDelay] = useState(1);

  function startTraining() {
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      const step = [];
      for (let j = 0; j < numObjects; j++) {
        step.push({
          color: useColors ? randomColor() : null,
          number: useNumbers ? Math.floor(Math.random() * 100) : null,
          shape: useShapes ? randomShape() : null
        });
      }
      sequence.push(step);
    }

    onStart({
      numObjects,
      sequenceLength,
      orderMatters,
      audioSpeed,
      pauseMode,
      timeDelay,
      sequence
    });
  }

  function randomColor() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function randomShape() {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  return (
    <div className="settings-screen">
      <h1>Memory Training Settings</h1>
      <label>Number of objects: {numObjects}</label>
      <input type="range" min="1" max="6" value={numObjects} onChange={(e) => setNumObjects(Number(e.target.value))} />

      <label>Sequence length: {sequenceLength}</label>
      <input type="range" min="3" max="10" value={sequenceLength} onChange={(e) => setSequenceLength(Number(e.target.value))} />

      <label>
        <input type="checkbox" checked={useColors} onChange={() => setUseColors(!useColors)} /> Use colors
      </label>
      <label>
        <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} /> Use numbers
      </label>
      <label>
        <input type="checkbox" checked={useShapes} onChange={() => setUseShapes(!useShapes)} /> Use shapes
      </label>

      <label>
        <input type="checkbox" checked={orderMatters} onChange={() => setOrderMatters(!orderMatters)} /> Order matters
      </label>

      <label>Audio Speed (0.5 to 2):</label>
      <input type="range" min="0.5" max="2" step="0.1" value={audioSpeed} onChange={(e) => setAudioSpeed(Number(e.target.value))} />

      <label>
        <input type="checkbox" checked={pauseMode} onChange={() => setPauseMode(!pauseMode)} /> Tap to advance changes
      </label>

      <label>Time delay between changes (seconds):</label>
      <input type="number" min="0" max="5" value={timeDelay} onChange={(e) => setTimeDelay(Number(e.target.value))} />

      <button onClick={startTraining}>Start Training</button>
    </div>
  );
}

export default Settings;