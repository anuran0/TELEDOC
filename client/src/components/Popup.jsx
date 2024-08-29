import React from 'react';
import './Popup.css';

function Popup({ content, closePopup }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Diagnosis Result</h2>
        <div className="popup-content">{content}</div>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
