import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export function DefaultHeader() {
  return (
    <Row>
      <Col>
        <h1>Select a character!</h1>
      </Col>
    </Row>
  );
}

export function ReadyHeader(props) {
  return (
    <Row className="mb-4 w-100 text-center">
      <Col>
        <Button
          className="shadow ready-btn"
          variant="dark"
          onClick={props.onClick}
        >
          Ready?
        </Button>
      </Col>
    </Row>
  );
}
