import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async () => {
    try {
      const { data } = await axios.get('https://ipapi.com/json');
      const location = { state: data.region };

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        email,
        password,
        location,
      });

      if (response.data.message.includes('OTP')) {
        alert(response.data.message);
        setOtpSent(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {otpSent && <p>OTP sent. Check your email or SMS.</p>}
    </div>
  );
};

export default Login;
