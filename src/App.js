import "./App.css";
import React, { Router, Switch, Route, AuthContext, Component, useState, useEffect } from "react";
import Sitebar from "./home/Sitebar";
import Auth from "./auth/Auth";
import WorkoutIndex from "./workouts/WorkoutIndex";

//const log = (...args) => console.log(...args);

class App extends Component {
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
    } else {
      return (
        <Route path="/auth">
          <Auth />
        </Route>
      );
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
}

export default App;
