import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import HeroSection from './components/HeroSection';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleUpload = (data) => {
    setFileData(data);
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1a1a3e',
          color: '#fff',
          border: '1px solid #764ba2'
        }
      }} />
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <HeroSection onUpload={handleUpload} />
      )}
    </>
  );
}

export default App;
