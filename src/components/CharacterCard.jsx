import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const CharacterCard = ({ hero, players, selectPlayer }) => {
  const { player1, player2 } = players;

  /* Handle Border Color Change Logic When Card Btn Is Clicked  */
  const handleBorderColorChange = () => {
    if (player1.name === hero.name && player2.name === hero.name) {
      return "solid #ffc107 7px";
    } else if (player1.name === hero.name) {
      return "solid #198754 7px";
    } else if (player2.name === hero.name) {
      return "solid #dc3545 7px";
    } else {
      return "solid gray 7px";
    }
  };

  return (
    <Card
      className={`bg-dark text-center m-2 shadow ${
        player1.name === hero.name || player2.name === hero.name
          ? "make-card-wiggle"
          : ""
      }`}
      style={{
        width: "18rem",
        border: handleBorderColorChange()
      }}
    >
      <Card.Img variant="top" src={hero.img} />
      <Card.Body>
        <Card.Title className="text-light">
          <strong>{hero.name}</strong>
        </Card.Title>

        <ListGroup className="mb-3">
          <ListGroup.Item className="d-flex p-0">
            <div className="bg-warning w-50">
              <strong>Quirk:</strong>
            </div>
            <div className="w-50">{hero.quirk}</div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex p-0">
            <div className="bg-warning w-50">
              <strong>Health:</strong>
            </div>
            <div className="w-50">{hero.health}</div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex p-0">
            <div className="bg-warning w-50">
              <strong>Stamina:</strong>
            </div>
            <div className="w-50">{hero.stamina}</div>
          </ListGroup.Item>
        </ListGroup>

        {/* Character Abilities For VS Screen */}
        {hero.ablities}

        {/* Player One Button */}
        <Button
          className={`me-2 border-0 ${
            player1 && player1.name !== hero.name ? "disabled" : ""
          }`}
          onClick={() => selectPlayer(hero, 1)}
          style={{
            backgroundColor: player1.name === hero.name ? "green" : "gray"
          }}
        >
          Player 1
        </Button>

        {/* Player Two Button */}
        <Button
          className={`me-2 border-0 ${
            player2 && player2.name !== hero.name ? "disabled" : ""
          }`}
          onClick={() => selectPlayer(hero, 2)}
          style={{
            backgroundColor: player2.name === hero.name ? "red" : "gray"
          }}
        >
          Player 2
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
