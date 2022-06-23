import React, { useEffect } from "react";
import CharacterCard from "../../CharacterCard";
import { characters } from "../../../shared/characters";
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
############################################################
# If both players are selected scroll to the top of screen #
############################################################
*/
  useEffect(() => {
    if (player1 && player2) {
      window.scrollTo(0, 0);
    }
  }, [player1, player2]);

  /* 
#######################
# Methods / Functions #
####################### 
*/
  const handleTitleChange = () => {
    if (selectionStep === 1 && !player1) {
      return (
        <Col className="text-center">
          <h1 className="player1-select-title">Player 1 Select Character</h1>
        </Col>
      );
    }
    if (selectionStep === 2 && !player2) {
      return (
        <Col className="text-center">
          <h1 className="player2-select-title">Player 2 Select Character</h1>
        </Col>
      );
    }
    if (player1 && player2) {
      return (
        <>
          <Col className="d-flex d-lg-block flex-column justify-content-center align-items-center col-lg-5 text-center p-3 rounded">
            <Button
              className="bg-success border-0 mb-3 mb-lg-0 me-lg-3"
              style={{ width: "125px", height: "50px" }}
              onClick={fight}
            >
              Fight
            </Button>
            <Button
              className="bg-danger border-0"
              style={{ width: "125px", height: "50px" }}
              onClick={chooseAgain}
            >
              Choose Again
            </Button>
          </Col>
        </>
      );
    }
  };

  const handleSelectedPlayer = (player) => {
    if (player === player1) {
      return (
        <Col className="d-flex flex-column flex-lg-row justify-content-around align-items-center">
          <img src={player.img} alt={player.name} style={{ width: "60px" }} />
          <h5 className="m-0 text-success">{player.name}</h5>
        </Col>
      );
    }
    if (player === player2) {
      return (
        <Col className="d-flex flex-column flex-lg-row justify-content-around align-items-center">
          <h5 className="m-0 text-danger order-last order-lg-first">
            {player.name}
          </h5>
          <img src={player.img} alt={player.name} style={{ width: "60px" }} />
        </Col>
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
      <Row
        className="d-flex justify-content-center align-items-center w-100 mb-3 bg-dark shadow rounded"
        style={{ maxWidth: "1100px" }}
      >
        {handleSelectedPlayer(player1)}
        {handleTitleChange()}
        {handleSelectedPlayer(player2)}
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
