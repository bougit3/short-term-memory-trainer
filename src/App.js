
import React, { useState } from 'react';
import Settings from './components/Settings';
import TrainingScreen from './components/TrainingScreen';
import RecallScreen from './components/RecallScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [phase, setPhase] = useState('settings');
  const [trainingData, setTrainingData] = useState(null);
  const [recallData, setRecallData] = useState(null);
  const [results, setResults] = useState(null);

  return (
    <div className="app-container">
      {phase === 'settings' && (
        <Settings onStart={(data) => {
          setTrainingData(data);
          setPhase('training');
        }} />
      )}
      {phase === 'training' && (
        <TrainingScreen data={trainingData} onComplete={() => setPhase('recall')} />
      )}
      {phase === 'recall' && (
        <RecallScreen data={trainingData} onSubmit={(recall) => {
          setRecallData(recall);
          const score = recall.map((item, index) =>
            JSON.stringify(item) === JSON.stringify(trainingData.sequence[index])
          );
          setResults(score);
          setPhase('results');
        }} />
      )}
      {phase === 'results' && (
        <ResultsScreen
          results={results}
          data={trainingData}
          recallData={recallData}
          onRestart={() => {
            setTrainingData(null);
            setRecallData(null);
            setResults(null);
            setPhase('settings');
          }}
        />
      )}
    </div>
  );
}

export default App;
