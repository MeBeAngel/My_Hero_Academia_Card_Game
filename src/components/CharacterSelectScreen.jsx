import React from "react";
import CharacterCard from "./CharacterCard";
import { characters } from "../shared/characters";
import { Row, Col, Button } from "react-bootstrap";

export default function CharacterSelectScreen({
  player1,
  player2,
  selectionStep,
  selectPlayer,
  fight,
  chooseAgain
}) {
  /* 
#######################
# Methods / Functions #
####################### 
*/
  const handleTitleChange = () => {
    if (selectionStep === 1 && !player1) {
      return (
        <h1 className="player1-select-title">Player 1 Select Character</h1>
      );
    }
    if (selectionStep === 2 && !player2) {
      return (
        <h1 className="player2-select-title">Player 2 Select Character</h1>
      );
    }
    if (player1 && player2) {
      return (
        <div className="bg-dark p-3 rounded">
          <Button className="bg-success border-0 me-3 p-3" onClick={fight}>
            Fight
          </Button>
          <Button className="bg-danger border-0 p-3" onClick={chooseAgain}>
            Choose Again
          </Button>
        </div>
      );
    }
  };

  /* 
###############
# Main Return #
############### 
*/

  return (
    <>
      {/* Character Screen Title Section */}
      <Row className="text-center">
        <Col>{handleTitleChange()}</Col>
      </Row>
      {/* Character Gallery Section */}
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", maxWidth: "1400px" }}
      >
        {characters.map((hero) => {
          return (
            <Col
              key={hero.id}
              className="d-flex justify-content-center align-items-center"
            >
              <CharacterCard
                hero={hero}
                players={{ player1, player2 }}
                selectPlayer={selectPlayer}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
