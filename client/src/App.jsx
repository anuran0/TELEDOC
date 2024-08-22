import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Symptoms from '../components/Symptoms';
import Form from '../components/Forms';
import AboutUs from '../components/Navbar/about'; // Import About Us page

const App = () => {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<div><Symptoms /><Form /></div>} /> {/* Home route */}
          <Route path="/about" element={<AboutUs />} /> {/* About Us route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

