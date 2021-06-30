import { useState, useEffect } from 'react';
import Sitebar from './home/Sitebar';
import Auth from "./auth/Auth";
import WorkoutIndex from './workouts/WorkoutIndex';

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

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  }

  const protectedViews = () =>{
    return (sessionToken === localStorage.getItem("token") ? <WorkoutIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
