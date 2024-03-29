// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import "./login.css";


const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fullstackserver.onrender.com/login', {
        email,
        password,
      });

      const { token } = response.data;

      setToken(token);
      localStorage.setItem('jwtToken', token);
      console.log("TOKEN: " + token);
   

      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
      });

      // Navigate to the landing page
      navigate('/Landingpage', );
    } catch (error) {
      console.error('Login failed', error.response?.data?.error || 'Internal Server Error');
      
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.error || 'Internal Server Error',
      });
    }
  };
  const isLoginpage= location.pathname === '/';
  return (
    <div
      className={`container2 d-flex justify-content-center align-items-center vh-100 ${isLoginpage ? 'login-page' : ''}`}
    >
      <div className="form">
        <h2 className="mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary colochange" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <button className="btn btn-link" onClick={() => navigate('/signup')}>Signup</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
