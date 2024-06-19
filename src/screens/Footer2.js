import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faYoutube, faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer2 = () => {
  return (
    <footer style={footerStyle}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px' }}>
      <div style={{ textAlign: 'left' }}>
        <p><strong>K. J. Somaiya Institute of Technology</strong></p>
        <p>Somaiya Ayurvihar Complex, Eastern Express Highway,</p>
        <p>Near Everard Nagar, Sion (East), Mumbai – 400 022</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p>Contact: 91-22-44444408 / 44444403</p>
        {/* <p>
            <a href="mailto:info.tech@somaiya.edu"  style={{ color: '#000'}}>info.tech@somaiya.edu</a>
          </p> */}
        <p>
          <a href="https://www.linkedin.com/in/kjsieit" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" style={{ marginRight: '10px', color: '#333' }} />
          </a>
          <a href="https://www.youtube.com/kjsieitofficial" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="lg" style={{ marginRight: '10px', color: '#333' }} />
          </a>
          <a href="https://www.instagram.com/kjsit_official/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" style={{ marginRight: '10px', color: '#333' }} />
          </a>
          <a href="https://www.facebook.com/kjsit1official" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" style={{ marginRight: '10px', color: '#333' }} />
          </a>
          <a href="https://www.twitter.com/kjsieit1" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: '#333' }} />
          </a>
        </p>
      </div>
    </div>
  </footer>
  );
};

const footerStyle = {
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  backgroundColor: '#f1f1f1',
  textAlign: 'center',
  padding: '20px 0',
  borderTop: '1px solid #ccc',
  margin: 0, // Ensure no margin is applied
//   boxSizing: 'border-box',
};

export default Footer2;
