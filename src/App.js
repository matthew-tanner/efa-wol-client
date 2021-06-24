import "./App.css";
import React, { Router, Switch, Route, AuthContext, Component, useState, useEffect } from "react";
import Sitebar from "./home/Sitebar";
import Auth from "./auth/Auth";
import WorkoutIndex from "./workouts/WorkoutIndex";

const log = (...args) => console.log(...args);

class App extends Component {
  //const [sessionToken, setSessionToken] = useState("");

  constructor() {
    super();
    this.setToken = (token) => {
      localStorage.setItem("token", token);
      this.setState({ sessionToken: token });
    };

    this.state = {
      sessionToken: "",
      setToken: this.setToken,
    };
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem("token")) {
      return (
        <Switch>
          <Route path="/" exact>
            <WorkoutIndex />
          </Route>
        </Switch>
      );
    }else {
      return(
        <Route path="/auth">
          <Auth />
        </Route>
      )
    }
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <div>
            <Sitebar clickLogout={this.logout} />
            {this.protectedViews()}
          </div>
        </AuthContext.Provider>
      </Router>
    );
  }
  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     setSessionToken(localStorage.getItem("token"))
  //   }
  // }, [])

  // const updateToken = (newToken) => {
  //   localStorage.setItem("token", newToken);
  //   setSessionToken(newToken);
  //   log("Info - new token", ":", updateToken.name, newToken );
  // }

  // const clearToken = () => {
  //   localStorage.clear();
  //   setSessionToken("");
  // }

  // const protectedViews = () => {
  //   return ( sessionToken === localStorage.getItem("token") ? <WorkoutIndex token={sessionToken}/>
  //   : <Auth updateToken={updateToken}/>)
  // }

  // return (
  //   <div>
  //     <Sitebar clickLogout={clearToken} />
  //     {protectedViews()}
  //   </div>
  // );
}

export default App;
