import React from 'react';
function About() {
  return (
    <div className="About">
      <h1>About Us</h1>
      
      <div className="card description-card">
        <h2>Our Mission</h2>
        <p>
          With Teledocs, we are revolutionizing healthcare by providing in-home consultations with cutting-edge AI and deep learning algorithms to deliver individualized, real-time diagnostic help. With Teledocs, you may get in-depth medical advice based on your symptoms.
        </p>
        <p>
          Our goal is to provide convenient access to basic healthcare through a safe and easy-to-use interface and fill in the gap of unavailability of primary healthcare consultations in rural areas.
        </p>
      </div>

      <h2>Our Team</h2>
      <div className="team-section">
        <div className="team-card">
          <img src='../assets/anuran.jpg' alt="Team Member 1" />
          <h3>Anuran De</h3>
        </div>
        <div className="team-card">
          <img src='' alt="Team Member 2" />
          <h3>Nirajana Pal</h3>
        </div>
      </div>

      <p>
        Our team of doctors, engineers, and AI experts works tirelessly to make healthcare more accessible and efficient.
      </p>
    </div>
  );
}

export default About;