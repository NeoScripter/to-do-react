import React, { useState } from "react";
import { register } from "./api";
import "./Register.css";

function Register() {
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
    <form className="signup-wrapper" onSubmit={handleRegister}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
