import './App.css';
import chalk from "chalk";
import { useState, useEffect } from 'react';
import Sitebar from './Home/Sitebar';

const log = (...args) => console.log(...args);

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    log("Info - new token", ":", updateToken.name, newToken );
  }

  return (
    <div>
      <Sitebar />
    </div>
  );
}

export default App;
