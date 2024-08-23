import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';

function Home() {
  const [diagnosis, setDiagnosis] = useState('');

  const handleDiagnosis = (data) => {
    setDiagnosis(data);
  };

  return (
    <div className="Home">
      <h1>Welcome to TELEDOCS</h1>
      <SymptomForm onDiagnosis={handleDiagnosis} />
      {diagnosis && (
        <div className="diagnosis-result">
          <h2>Diagnosis Result</h2>
          <div className="diagnosis-card">
            <div className="diagnosis-content">
              <p>{diagnosis}</p>
            </div>
            <div className="disclaimer">
              <p><strong>Disclaimer:</strong> This information is not a substitute for professional medical advice. If you are experiencing these symptoms, it is important to consult with a doctor for a proper diagnosis and treatment plan.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;