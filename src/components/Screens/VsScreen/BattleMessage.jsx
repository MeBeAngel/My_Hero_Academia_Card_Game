import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function BattleMessage({
  message,
  gameOver,
  resetBattle,
  refreshPage
}) {
  return (
    <Row
      className="d-flex  align-items-center bg-dark text-light shadow rounded mt-4"
      style={{ width: "100%", maxWidth: "700px" }}
    >
      <Col
        className="d-flex flex-column justify-content-center align-items-center rounded m-2"
        style={{ height: "200px", border: "solid white 3px" }}
      >
        <h5 className={gameOver ? "mb-4 text-center" : "m-0 text-center"}>
          {message}
        </h5>
        {/* Buttons Are Only Visible If gameOver Is True  */}
        <div className={gameOver ? "" : "d-none"}>
          <Button
            className="bg-success border-0 rounded me-2"
            onClick={resetBattle}
          >
            Rematch
          </Button>
          <Button className="bg-danger border-0 rounded" onClick={refreshPage}>
            Choose Again
          </Button>
        </div>
      </Col>
    </Row>
  );
}
