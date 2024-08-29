import React, { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import Modal from '../components/Modal';
import '../styles.css'; // Make sure to style Home component as needed

function Home() {
  const [diagnosis, setDiagnosis] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDiagnosis = (data) => {
    setDiagnosis(data);
    setIsModalOpen(true); // Open the modal when a diagnosis is available
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Home">
      <h1>Welcome to TELEDOCS</h1>
      <SymptomForm onDiagnosis={handleDiagnosis} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="diagnosis-result">
          <h2>Diagnosis Result</h2>
          <div className="diagnosis-card">
            <div className="diagnosis-content">
              <p>{diagnosis}</p>
            </div>
            <div className="disclaimer">
              <p><strong>Disclaimer:</strong> This information is not a substitute for professional medical advice. This model is still under research and development</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
