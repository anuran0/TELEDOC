import React from 'react';
import Checkbox from './Checkbox'; 

const Symptoms = () => {
  const symptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Shortness of Breath',
    'Chest Pain',
    'Dizziness',
    'Nausea',
    'Abdominal Pain',
    'Joint Pain',
    'Rash',
    'Swollen Lymph Nodes',
    'Sore Throat',
    'Vomiting',
    'Diarrhea',
    'Constipation',
    'Back Pain',
    'Frequent Urination',
    'Night Sweats',
    'Blurred Vision',
    'Confusion',
    'Muscle Weakness',
    'Paleness',
    'Tingling or Numbness',
    'Excessive Thirst',
    'Hair Loss',
    'Heart Palpitations',
    'Loss of Appetite',
    'Difficulty Swallowing',
    'Dry Skin',
    'Hearing Loss',
    'Swollen Feet',
    'Yellowing of Skin',
    'Red Eyes',
    'Blood in Stool',
    'Blood in Urine',
    'Dry Mouth',
    'Chronic Cough',
    'Sudden Weight Gain',
    'Loss of Balance',
    'Cold Hands/Feet',
    'Nightmares',
    'Sleepiness During Daytime',
    'Leg Cramps',
    'Bloating',
    'Hot Flashes',
    'Persistent Hiccups',
    'Unexplained Bruising',
    'Itchy Skin'
];

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        Enter Your Symptoms
      </div>
      <div className="mt-2 ms-5">
        {symptoms.map((symptom, index) => (
          <div key={index} className="form-check d-flex align-items-center mb-2">
            <Checkbox />
            <label className="form-check-label ms-2">{symptom}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Symptoms;
