import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password){
      fetch(`http://localhost:3001/user/login`, {
        method: "POST",
        body: JSON.stringify({ user: { username: username, password: password } }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.updateToken(data.data.sessionToken);
        });
    }else{
      !username ? setUserError("field is required") : setUserError("");
      !password ? setPassError("field is required") : setPassError("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {userError}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passError}
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Login</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
