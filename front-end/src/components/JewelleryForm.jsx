import React from 'react';
import { Link } from 'react-router-dom';
import './JewelleryForm.css';

const JewelleryForm = () => {
  return (
    <nav className="navbar">
      <h2>Zitara</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default JewelleryForm;
