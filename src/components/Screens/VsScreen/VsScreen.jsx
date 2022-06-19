import React, { useState } from "react";
import BattleMessage from "./BattleMessage";
import ResetBtn from "../ResetBtn";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import refreshPage from "../../../shared/refreshPage";

export default function VsScreen({ player1, player2 }) {
  /* 
####################
# State Management #
#################### 
*/
  const [message, setMessage] = useState("Start Match!");
  const [playerTurn, setPlayerTurn] = useState(
    Math.floor(Math.random() * 2) + 1
  );
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState();
  const [cardZoom, setCardZoom] = useState({ player1: false, player2: false });

  /* 
#######################
# Methods / Functions #
####################### 
*/

  /* 
######################
# Player Turn Change #
###################### 
*/
  const handlePlayerTurnChange = () => {
    if (playerTurn === 1) {
      return <p className="p1-turn m-0">P1</p>;
    } else if (playerTurn === 2) {
      return <p className="p2-turn m-0"> P2 </p>;
    } else {
      return "";
    }
  };

  /* 
########################
# Handle Ability Click #
######################## 
*/
  const handleAbilityClick = (e, index) => {
    const damageDone = Math.floor(Math.random() * 26);

    /* Player 1 Logic */
    if (playerTurn === 1 && e.target.name === "player1" && player1.health > 0) {
      if (damageDone === 0) {
        setMessage(player1.useAbility(index, `but it missed`));
        setPlayerTurn(2);
      } else {
        setMessage(
          player1.useAbility(index, `${player2.name} was hit for ${damageDone}`)
        );
        setPlayerTurn(2);
        player2.health = player2.health - damageDone;
        console.log(e.target);
      }
      setCardZoom({ player1: true, player2: false });
    }

    /* Player 2 Logic */
    if (playerTurn === 2 && e.target.name === "player2" && player2.health > 0) {
      if (damageDone === 0) {
        setMessage(player2.useAbility(index, `but it missed`));
        setPlayerTurn(1);
      } else {
        setMessage(
          player2.useAbility(index, `${player1.name} was hit for ${damageDone}`)
        );
        setPlayerTurn(1);
        player1.health = player1.health - damageDone;
        console.log(e.target);
      }
      setCardZoom({ player1: false, player2: true });
    }

    /* Gameover Logic */
    if (player1.health <= 0 || player2.health <= 0) {
      if (player1.health <= 0) {
        setMessage("Player 2 Won!");
        setWinner("player2");
      }
      if (player2.health <= 0) {
        setMessage("Player 1 Won!");
        setWinner("player1");
      }
      setGameOver(true);
    }
  };

  /* 
################
# Reset Battle #
################ 
*/
  const resetBattle = () => {
    player1.health = 100;
    player2.health = 100;
    setGameOver(false);
    setMessage("Battle Message Goes Here");
    setPlayerTurn(Math.floor(Math.random() * 2) + 1);
    setWinner("");
  };

  /* 
####################
# Defeated Overlay #
####################
*/
  const defeatedOverlay = (
    <div className="card-overlay d-flex justify-content-center align-items-center">
      <p>Defeated</p>
    </div>
  );

  /* 
###############
# Main Return #
############### 
*/
  return (
    <>
      <Row
        className="flex-column flex-lg-row d-flex justify-content-center align-items-center"
        style={{ width: "100%", maxWidth: "900px" }}
      >
        {/* 
############
# Player 1 #
############
*/}
        <Col className="d-flex justify-content-center align-items-center">
          <Card
            className={`vs-card bg-dark text-center m-2 shadow ${
              cardZoom.player1 ? "make-card-zoom" : ""
            }`}
            style={{
              width: "20rem",
              border: "solid green 7px"
            }}
          >
            <Card.Img variant="top" src={player1.img} />
            <Card.Body>
              <Card.Title className="text-light">
                <strong>{player1.name}</strong>
              </Card.Title>

              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Quirk:</strong>
                  </div>
                  <div className="w-50">{player1.quirk}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Health:</strong>
                  </div>
                  <div className="w-50">{player1.health}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Stamina:</strong>
                  </div>
                  <div className="w-50">{player1.stamina}</div>
                </ListGroup.Item>
              </ListGroup>

              {/* Character Abilities */}
              <ListGroup>
                {player1.abilities.map((ability, index) => {
                  return (
                    <ListGroup.Item
                      name="player1"
                      className={
                        gameOver ? "disabled" : "p1-ability-list__item"
                      }
                      key={player1.abilities.indexOf(ability)}
                      action
                      onClick={(e) => {
                        handleAbilityClick(e, index);
                      }}
                    >
                      {ability}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
            {/* Defeated Overlay */}
            {winner === "player2" ? defeatedOverlay : ""}
          </Card>
        </Col>

        {/* VS text */}
        <Col className="col-2 text-center">
          <div>
            <p
              className="text-dark m-0"
              style={{ fontSize: "30px", fontWeight: "bold" }}
            >
              Turn
            </p>
            {handlePlayerTurnChange()}
          </div>
        </Col>

        {/* 
############
# Player 2 #
############
*/}
        <Col className="d-flex justify-content-center align-items-center">
          <Card
            className={`vs-card bg-dark text-center m-2 shadow ${
              cardZoom.player2 ? "make-card-zoom" : ""
            }`}
            style={{
              width: "20rem",
              border: "solid red 7px"
            }}
          >
            <Card.Img variant="top" src={player2.img} />
            <Card.Body>
              <Card.Title className="text-light">
                <strong>{player2.name}</strong>
              </Card.Title>

              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Quirk:</strong>
                  </div>
                  <div className="w-50">{player2.quirk}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Health:</strong>
                  </div>
                  <div className="w-50">{player2.health}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Stamina:</strong>
                  </div>
                  <div className="w-50">{player2.stamina}</div>
                </ListGroup.Item>
              </ListGroup>

              {/* Character Abilities */}
              <ListGroup>
                {player2.abilities.map((ability, index) => {
                  return (
                    <ListGroup.Item
                      name="player2"
                      className={
                        gameOver ? "disabled" : "p2-ability-list__item"
                      }
                      key={player2.abilities.indexOf(ability)}
                      action
                      onClick={(e) => {
                        handleAbilityClick(e, index);
                      }}
                    >
                      {ability}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
            {/* Defeated Overlay */}
            {winner === "player1" ? defeatedOverlay : ""}
          </Card>
        </Col>
      </Row>
      {/* 
##########################
# Battle Message Section #
##########################
*/}
      <BattleMessage
        message={message}
        gameOver={gameOver}
        resetBattle={resetBattle}
        refreshPage={refreshPage}
      />
      {/* 
#####################
# Reset Game Button #
#####################
*/}
      <Row className="my-3">
        <Col>
          <ResetBtn />
        </Col>
      </Row>
    </>
  );
}
