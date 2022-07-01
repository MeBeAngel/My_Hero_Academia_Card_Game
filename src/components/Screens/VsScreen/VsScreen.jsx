import React, { useState, useEffect } from "react";
import BattleMessage from "./BattleMessage";
import ResetBtn from "../ResetBtn";
import ArrowSvg from "./ArrowSvg";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import refreshPage from "../../../shared/refreshPage";

export default function VsScreen({ player1, player2 }) {
  /* 
####################
# State Management #
#################### 
*/
  const [p1, setP1] = useState({
    id: player1.id,
    img: player1.img,
    name: player1.name,
    quirk: player1.quirk,
    health: player1.health,
    stamina: player1.stamina,
    abilities: player1.abilities
  });
  const [p2, setP2] = useState({
    id: player2.id,
    img: player2.img,
    name: player2.name,
    quirk: player2.quirk,
    health: player2.health,
    stamina: player2.stamina,
    abilities: player2.abilities
  });
  const [message, setMessage] = useState("Start Match!");
  const [playerTurn, setPlayerTurn] = useState(
    Math.floor(Math.random() * 2) + 1
  );
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState();
  const [cardZoom, setCardZoom] = useState({ player1: false, player2: false });

  /* Gameover Logic */
  useEffect(() => {
    if (
      p1.health <= 0 ||
      p2.health <= 0 ||
      p1.stamina <= 0 ||
      p2.stamina <= 0
    ) {
      if (p1.health <= 0) {
        setMessage(`${p2.name} Won!`);
        setWinner("player2");
      }
      if (p1.stamina <= 0) {
        setMessage(`${p1.name} ran out of stamina! ${p2.name} Won!`);
        setWinner("player2");
      }
      if (p2.health <= 0) {
        setMessage(`${p1.name} Won!`);
        setWinner("player1");
      }
      if (p2.stamina <= 0) {
        setMessage(`${p2.name} ran out of stamina! ${p1.name} Won!`);
        setWinner("player1");
      }
      setGameOver(true);
    }
  }, [p1, p2]);

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
    const lowDamageDone = Math.floor(Math.random() * 6);
    const medDamageDone = Math.floor(Math.random() * 11);
    const heavyDamageDone = Math.floor(Math.random() * 11);

    /* Player 1 Logic */
    if (playerTurn === 1 && e.target.name === "player1" && p1.health > 0) {
      if (lowDamageDone === 0 || medDamageDone === 0 || heavyDamageDone === 0) {
        setMessage(player1.useAbility(index, `but it missed`));
        setPlayerTurn(2);
      }

      if (index === 0 && lowDamageDone !== 0) {
        setMessage(
          player1.useAbility(index, `${p2.name} was hit for ${lowDamageDone}`)
        );
        let subtractStamina = p1.stamina - 5;
        setP1({ ...p1, stamina: subtractStamina });
        let subtractHealth = p2.health - lowDamageDone;
        setP2({ ...p2, health: subtractHealth });
        setPlayerTurn(2);
      }

      if (index === 1 && medDamageDone !== 0) {
        setMessage(
          player1.useAbility(
            index,
            `${p2.name} was hit for ${medDamageDone + 5}`
          )
        );
        setP1({ ...p1, stamina: p1.stamina - 15 });
        setP2({ ...p2, health: p2.health - (medDamageDone + 5) });
        setPlayerTurn(2);
      }

      if (index === 2 && heavyDamageDone !== 0) {
        setMessage(
          player1.useAbility(
            index,
            `${p2.name} was hit for ${heavyDamageDone + 15}`
          )
        );
        setP1({ ...p1, stamina: p1.stamina - 25 });
        setP2({ ...p2, health: p2.health - (heavyDamageDone + 15) });
        setPlayerTurn(2);
      }

      setCardZoom({ player1: true, player2: false });
    }

    /* Player 2 Logic */
    if (playerTurn === 2 && e.target.name === "player2" && p2.health > 0) {
      if (lowDamageDone === 0 || medDamageDone === 0 || heavyDamageDone === 0) {
        setMessage(player2.useAbility(index, `but it missed`));
        setPlayerTurn(1);
      }

      if (index === 0 && lowDamageDone !== 0) {
        setMessage(
          player2.useAbility(index, `${p1.name} was hit for ${lowDamageDone}`)
        );
        let subtractStamina = p2.stamina - 5;
        setP2({ ...p2, stamina: subtractStamina });
        let subtractHealth = p1.health - lowDamageDone;
        setP1({ ...p1, health: subtractHealth });
        setPlayerTurn(1);
      }

      if (index === 1 && medDamageDone !== 0) {
        setMessage(
          player2.useAbility(
            index,
            `${p1.name} was hit for ${medDamageDone + 5}`
          )
        );
        setP2({ ...p2, stamina: p2.stamina - 15 });
        setP1({ ...p1, health: p1.health - (medDamageDone + 5) });
        setPlayerTurn(1);
      }

      if (index === 2 && heavyDamageDone !== 0) {
        setMessage(
          player2.useAbility(
            index,
            `${p1.name} was hit for ${heavyDamageDone + 15}`
          )
        );
        setP2({ ...p2, stamina: p2.stamina - 25 });
        setP1({ ...p1, health: p1.health - (heavyDamageDone + 15) });
        setPlayerTurn(1);
      }

      setCardZoom({ player1: false, player2: true });
    }
  };

  /* 
################
# Reset Battle #
################ 
*/
  const resetBattle = () => {
    setP1({
      ...p1,
      health: 100,
      stamina: 150
    });
    setP2({
      ...p2,
      health: 100,
      stamina: 150
    });
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
            <Card.Img variant="top" src={p1.img} />
            <Card.Body>
              <Card.Title className="text-light">
                <strong>{p1.name}</strong>
              </Card.Title>

              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Quirk:</strong>
                  </div>
                  <div className="w-50">{p1.quirk}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Health:</strong>
                  </div>
                  <div className="w-50">{p1.health}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Stamina:</strong>
                  </div>
                  <div className="w-50">{p1.stamina}</div>
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
        {/* If gameOver is FALSE: show player turn message and arrow, otherwise remove it */}
        <Col className="col-2 text-center">
          {!gameOver && (
            <div>
              <p
                className="text-dark m-0"
                style={{ fontSize: "30px", fontWeight: "bold" }}
              >
                Turn
              </p>
              {handlePlayerTurnChange()}
              <ArrowSvg
                className={
                  playerTurn === 1 ? "make-arrow-turn-p1" : "make-arrow-turn-p2"
                }
                fill={playerTurn === 1 ? "#198754" : "#dc3545"}
              />
            </div>
          )}
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
            <Card.Img variant="top" src={p2.img} />
            <Card.Body>
              <Card.Title className="text-light">
                <strong>{p2.name}</strong>
              </Card.Title>

              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Quirk:</strong>
                  </div>
                  <div className="w-50">{p2.quirk}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Health:</strong>
                  </div>
                  <div className="w-50">{p2.health}</div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex p-0">
                  <div className="bg-warning w-50">
                    <strong>Stamina:</strong>
                  </div>
                  <div className="w-50">{p2.stamina}</div>
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
