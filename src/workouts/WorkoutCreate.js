import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";

const WorkoutCreate = (props) => {
  const [description, setDescription] = useState("");
  const [definition, setDefinition] = useState("Time");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/log`, {
      method: "POST",
      body: JSON.stringify({
        log: { description: description, definition: definition, result: result },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setDescription("");
        setDefinition("Time");
        setResult("");
        props.fetchWorkouts();
        props.createOff();
      });
  };

  const cancelCreate = () => {
    props.createOff();
  }

  return (
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="result">Result:</Label>
            <Input name="result" value={result} onChange={(e) => setResult(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description:</Label>
            <Input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="definition">Definition:</Label>
            <Input
              type="select"
              name="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
            >
              <option value="Time">Time</option>
              <option value="Weight">Weight</option>
              <option value="Distance">Distance</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">Create the workout</Button>{" "}
          <Button color="secondary" onClick={() => cancelCreate()}>Cancel</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default WorkoutCreate;

// <div>
// <h3>Log a Workout</h3>
// <Form onSubmit={handleSubmit}>
//   <FormGroup>
//     <Label htmlFor="description" />
//     <Input
//       name="description"
//       value={description}
//       onChange={(e) => setDescription(e.target.value)}
//     />
//   </FormGroup>
//   <FormGroup>
//     <Label htmlFor="definition" />
//     <Input
//       type="select"
//       name="definition"
//       value={definition}
//       onChange={(e) => setDefinition(e.target.value)}
//     >
//       <option value="Time">Time</option>
//       <option value="Weight">Weight</option>
//       <option value="Distance">Distance</option>
//     </Input>
//   </FormGroup>
//   <FormGroup>
//     <Label htmlFor="result" />
//     <Input name="result" value={result} onChange={(e) => setResult(e.target.value)} />
//   </FormGroup>
//   <Button type="submit">Click to Submit</Button>
// </Form>
// </div>
