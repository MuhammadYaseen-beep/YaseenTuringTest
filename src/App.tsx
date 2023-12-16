import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CallDetails from './components/CallDetails';

import CallsList from './components/CallsList';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/calls/:callId" element={<CallDetails />} />
        <Route path="/calls" element={<CallsList />} />
        <Route path="/" element={<Navigate replace to="/calls" />} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;


