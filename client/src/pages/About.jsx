import React from 'react';
function About() {
  return (
    <div className="About">
      <h1>About Us</h1>
      
      <div className="card description-card">
        <h2>Our Mission</h2>
        <p><b>
          Our goal is to provide convenient access to basic healthcare through a safe and easy-to-use interface and fill in the gap of unavailability of primary healthcare consultations in rural areas.
          </b>
        </p>
      </div>

      <h2>Our Team</h2>
      <div className="team-section">
        <div className="team-card">
          <img src='..\src\assets\anuran.jpg' alt="Team Member 1" />
          <h3>Anuran De</h3>
        </div>
        <div className="team-card">
          <img src='..\src\assets\niru.jpg' alt="Team Member 2" />
          <h3>Nirajana Pal</h3>
        </div>
      </div>

      <p>
       
      </p>
    </div>
  );
}

export default About;