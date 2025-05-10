// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.z}>Z</h1>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.homeLink}>Go back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  heading: {
    fontSize: '100px',
    color: '#0056b3',
  },
  text: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  homeLink: {
    fontSize: '18px',
    color: '#4caf50',
    textDecoration: 'none',
    border: '1px solid #4caf50',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
  },
  z: {
    fontSize: '100px',
    textDecorationThickness: 10,
    color: 'red',
    textShadow: "2px 3px 4px , -3px -3px 4px ",
    cursor:'pointer',
  }
};

export default NotFound;
