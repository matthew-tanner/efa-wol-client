import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

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
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
