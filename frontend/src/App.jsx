import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import HeroSection from './components/HeroSection';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileData, setFileData] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleUpload = (data) => {
    console.log('Upload complete:', data);
    setFileData(data);
    // Show extracted data
    if (data && data.entities) {
      toast.success('Document processed! Check the extracted data.');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <HeroSection onUpload={handleUpload} />
      )}
    </>
  );
}

export default App;
