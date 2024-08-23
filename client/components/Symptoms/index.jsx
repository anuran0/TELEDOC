import React, { useState } from 'react';
import Checkbox from './Checkbox'; 

const Symptoms = () => {
  const symptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue', 'Shortness of Breath', 
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

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleCheckboxChange = (symptom, isChecked) => {
    setSelectedSymptoms(prevSymptoms => 
      isChecked 
        ? [...prevSymptoms, symptom] 
        : prevSymptoms.filter(s => s !== symptom)
    );
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000', {  // Update URL to your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        Enter Your Symptoms
      </div>
      <div className="mt-2 ms-5">
        {symptoms.map((symptom, index) => (
          <div key={index} className="form-check d-flex align-items-center mb-2">
            <Checkbox 
              label={symptom} 
              checked={selectedSymptoms.includes(symptom)} 
              onChange={handleCheckboxChange} 
            />
            <label className="form-check-label ms-2">{symptom}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Submit
      </button>
    </>
  );
};

export default Symptoms;
