import React, { useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Button,
  NavItem,
  Nav,
  Collapse,
  Row,
  Col,
} from "reactstrap";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const logoutButton = () => {
    return props.token === localStorage.getItem("token") ? (
      <span>
        <Button color="warning" onClick={props.clickLogout}>Logout</Button>
      </span>
    ) : (
      <span></span>
    );
  };

  return (
    <Container>
      <Row>
        <Col sm={{size: "auto", offset: 11}}>
          <Navbar color="faded" light expand="md">
            <NavbarBrand>Workout Log</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>{logoutButton()}</NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Sitebar;
