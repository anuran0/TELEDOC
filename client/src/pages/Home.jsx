import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';

function Home() {
  const [diagnosis, setDiagnosis] = useState('');

  const handleDiagnosis = (data) => {
    setDiagnosis(data);
  };

  return (
    <div className="Home">
      <h1>Symptom Diagnosis</h1>
      <SymptomForm onDiagnosis={handleDiagnosis} />
      {diagnosis && (
        <div className="diagnosis-result">
          <h2>Diagnosis Result:</h2>
          <p>{diagnosis}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
