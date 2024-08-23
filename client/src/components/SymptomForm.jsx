import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const symptomsList = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Shortness of Breath', 
    'Chest Pain', 'Dizziness', 'Nausea', 'Abdominal Pain', 'Joint Pain',
    'Rash', 'Swollen Lymph Nodes', 'Sore Throat', 'Vomiting', 'Diarrhea',
    'Constipation', 'Back Pain', 'Frequent Urination', 'Night Sweats',
    'Blurred Vision', 'Confusion', 'Muscle Weakness', 'Paleness',
    'Tingling or Numbness', 'Excessive Thirst', 'Hair Loss',
    'Heart Palpitations', 'Loss of Appetite', 'Difficulty Swallowing',
    'Dry Skin', 'Hearing Loss', 'Swollen Feet', 'Yellowing of Skin',
    'Red Eyes', 'Blood in Stool', 'Blood in Urine', 'Dry Mouth',
    'Chronic Cough', 'Sudden Weight Gain', 'Loss of Balance',
    'Cold Hands/Feet', 'Nightmares', 'Sleepiness During Daytime',
    'Leg Cramps', 'Bloating', 'Hot Flashes', 'Persistent Hiccups',
    'Unexplained Bruising', 'Itchy Skin'
];

function SymptomForm({ onDiagnosis }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms(prevSymptoms =>
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter(s => s !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const symptoms = [...selectedSymptoms, customSymptom].filter(Boolean).join(', ');

    const response = await fetch('http://127.0.0.1:8000/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms })
    });

    const data = await response.json();
    onDiagnosis(data.diagnosis);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Select Symptoms</h2>
      <CheckboxGrid>
        {symptomsList.map((symptom, index) => (
          <CheckboxItem key={index}>
            <CheckboxInput
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleCheckboxChange(symptom)}
            />
            <span>{symptom}</span>
          </CheckboxItem>
        ))}
      </CheckboxGrid>
      <div>
        <label htmlFor="custom-symptom">Custom Symptom:</label>
        <input
          type="text"
          id="custom-symptom"
          value={customSymptom}
          onChange={(e) => setCustomSymptom(e.target.value)}
        />
      </div>
      <ButtonWrapper>
        <Button />
      </ButtonWrapper>
    </StyledForm>
  );
}

const CheckboxInput = styled.input`
  accent-color: #0B6E4F;  /* Adjust checkbox color for better visibility */
  margin-right: 10px;
  cursor: pointer;
`;

const StyledForm = styled.form`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
  width: 100%; /* Full width to use available space */
  max-width: 1200px; /* Set a maximum width for the form */
  margin: 0 auto; /* Center the form horizontally */
  
  h2 {
    color: #66ff66;
    text-align: center;
  }

  label {
    display: block;
    color: #ffffff;
    margin-bottom: 10px;
  }

  input[type="text"] {
    padding: 8px;
    width: 100%;
    background-color: #2e2e2e;
    border: 2px solid #66ff66;
    border-radius: 8px;
    color: #ffffff;
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Increased min-width for each grid item */
  gap: 15px;
  margin-bottom: 20px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  background: #2e2e2e;
  padding: 10px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  border: 1px solid #66ff66;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default SymptomForm;