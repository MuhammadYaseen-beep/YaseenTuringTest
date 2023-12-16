import React, { useState } from 'react';
import { login } from '../services/authService';
import './Login.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      onLoginSuccess();
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Turing Technologies</h1>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            className="login-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Log in</button>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );

};

export default Login;
