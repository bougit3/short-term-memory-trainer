import React from 'react';

function ResultsScreen({ results, onRestart }) {
  const correctCount = results.filter(Boolean).length;

  return (
    <div className="results-screen">
      <h2>Results</h2>
      <p>You got {correctCount} out of {results.length} steps correct.</p>
      <p>Each correct step means all objects in that step matched perfectly.</p>
      <button onClick={onRestart}>Try Again</button>
    </div>
  );
}

export default ResultsScreen;