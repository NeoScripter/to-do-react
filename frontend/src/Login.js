// frontend/src/Login.js
import React, { useState } from 'react';
import { login } from './api';

function Login({ setLoggedIn, setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.data.success) {
        sessionStorage.setItem('userId', response.data.userId);
        setLoggedIn(true);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Login error: ' + error.message);
    }
  };

  return (
    <form className="signup-wrapper" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
