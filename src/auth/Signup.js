import React, { Component, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {AuthContext} from "../auth/AuthContext"

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: JSON.stringify({user: this.state}),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.auth.setToken(data.data.sessionToken);
      });
  };

  validateSignUp = (event) =>{
    this.setState({
      errorMessage: "Fields must not be empty"
    })
    event.preventDefault();
  }

  render(){
    const submitHandler = !this.state.username ? this.validateSignUp : this.handleSubmit

    return(
      <div>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input onChange={this.handleChange} name="username" id="username" type="text" placeholder="enter username" />
          {this.state.errormessage && <span className="error">user name is required</span>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={this.handleChange} name="username" id="password" type="password" placeholder="enter password" />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
    )
  }

}

export default props => {
  <AuthContext.Consumer>
    {auth => <Signup {...props} auth={auth}/>}
  </AuthContext.Consumer>
}