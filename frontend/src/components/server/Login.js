import React, { useState } from 'react';
import { login } from './api';
import Reg from './Reg';

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
    <Reg 
    username={username}
    password={password}
    handleAction={handleLogin}
    setUsername={setUsername}
    setPassword={setPassword}
    actionName={"Log In"}
    />
  );
}

export default Login;
