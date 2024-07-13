import React, { useState } from "react";
import { register } from "./api";
import Reg from './Reg';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await register(username, password);
      if (response.data.success) {
        alert('Registration successful');
      } else {
        alert('Registration failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration error: ' + error.message);
    }
  };

  return (
    <Reg 
    username={username}
    password={password}
    handleAction={handleRegister}
    setUsername={setUsername}
    setPassword={setPassword}
    actionName={"Sign Up"}
    />
  );
}

export default Signup;
