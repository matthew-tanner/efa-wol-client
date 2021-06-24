import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

const WorkoutEdit = (props) => {
  const [editDescription, setEditDescription] = useState(props.workoutToUpdate.description);
  const [editDefinition, setEditDefinition] = useState(props.workoutToUpdate.definition);
  const [editResult, setEditResult] = useState(props.workoutToUpdate.result);

  const workoutUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({log: {description: editDescription, definition: editDefinition, result: editResult}}),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        props.fetchWorkouts();
        props.updateOff();
      });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor="result">Edit Result:</Label>
            <Input
              name="result"
              value={editResult}
              onChange={(e) => setEditResult(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Edit Description:</Label>
            <Input
              name="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="definition">Edit Definition:</Label>
            <Input
              name="definition"
              value={editDefinition}
              onChange={(e) => setEditDefinition(e.target.value)}
              />
          </FormGroup>
          <Button type="submit">Update the workout</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default WorkoutEdit;
