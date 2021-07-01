import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import WorkoutCreate from "./WorkoutCreate";
import WorkoutTable from "./WorkoutTable";
import WorkoutEdit from "./WorkoutEdit";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [createActive, setCreateActive] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});

  const fetchWorkouts = () => {
    fetch(`http://localhost:3001/log`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setWorkouts(logData.data);
      });
  };

  useEffect(() => {
    fetchWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUpdateWorkout = (workout) => {
    setWorkoutToUpdate(workout);
  };

  const createOn = () => {
    setCreateActive(true);
  };

  const createOff = () => {
    setCreateActive(false);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="9">
          <Button className="bg-success" onClick={() => {
                createOn();
              }}>Create Workout</Button>
          {createActive ? (
            <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} createOn={createOn} createOff={createOff} />
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="9">
          <WorkoutTable
            workouts={workouts}
            editUpdateWorkout={editUpdateWorkout}
            updateOn={updateOn}
            createOff={createOff}
            fetchWorkouts={fetchWorkouts}
            token={props.token}
          />
        </Col>
        {updateActive ? (
          <WorkoutEdit
            workoutToUpdate={workoutToUpdate}
            updateOff={updateOff}
            createOff={createOff}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
          />
        ) : (
          <div></div>
        )}
      </Row>
    </Container>
  );
};

export default WorkoutIndex;

// <Col md="3">
// <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
// </Col>
