

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/test.css';
import logo from '../logo.png';
const Footer = () => (
  <div className="footer-wrap">
    <div className="footer-wrapper">
      <div className="column-one">
        <img id="footer" src={logo} alt="Headout" />
        <p>HappyVacation is building the future of how we experience our traveling.</p>
        <p
          style={{
            color: '#2980b9',
            fontSize: '14px'
          }}
        >
          Made with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by NgoLuuQuocDat
        </p>
        <p>&copy; HappyVacation Inc.</p>
      </div>
      <div className="column-two">
        <h3>Comunities</h3>
        <ul>
          <li>Fanpage</li>
          <li>Comnunity blog</li>
          <li>Need help?</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div className="column-three">
        <h3>About us</h3>
        <ul>
          <li>About HappyVacation</li>
          <li>Careers</li>
          <li>Privacy Policy</li>
          <li>Terms of Usage</li>
        </ul>
      </div>
      <div className="column-four">
        <h3>Contact</h3>
        <p>Feel free to get in touch via email:</p>
        <p style={{ color: '#4fc3f7', cursor: 'pointer' }}>
          happyvacation@gmail.com
        </p>
        <div className="social-media-contact">
          <img
            src={logo}
            className="social-connect"
            alt="Connect with us"
          />
          <img
            src={logo}
            className="social-connect"
            alt="Connect with us"
          />
          <img
            src={logo}
            className="social-connect"
            alt="Connect with us"
          />
          <img
            src={logo}
            className="social-connect"
            alt="Connect with us"
          />
          <img
            src={logo}
            className="social-connect"
            alt="Connect with us"
            style={{ width: '25px', paddingBottom: '2px' }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;