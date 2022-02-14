import './App.css';

import { useState } from 'react';

import Shortener from './Components/Shortener';
import Login from './Components/Login';

import Signup from './Components/Signup';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const [apiKey, setApiKey] = useState('');

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            loginData ? (
              <Shortener
                apiKey={apiKey}
                setApiKey={setApiKey}
                loginData={loginData}
                setLoginData={setLoginData}
              />
            ) : (
              <Login loginData={loginData} setLoginData={setLoginData} />
            )
          }
        />

        <Route path="register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
