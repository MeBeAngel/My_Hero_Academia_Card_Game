import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CharacterSelectionScreen from "./CharacterSelectScreen/CharacterSelectScreen";
import VsScreens from "./VsScreen/VsScreen";
import Audio from "../../assets/audio/Symbol_of_Peace.MP3";

export default function Screens() {
  /* 
####################
# State Management #
#################### 
*/
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [selectionStep, setSelectionStep] = useState(1);
  const [fightWasClicked, setFightWasClicked] = useState(false);

  const selectPlayer = (hero, playerNum) => {
    if (selectionStep === 1 && playerNum === 1 && !player1) {
      setPlayer1(hero);
      setSelectionStep(2);
    } else if (selectionStep === 2 && playerNum === 2 && !player2) {
      setPlayer2(hero);
      setSelectionStep(1);
    }
  };

  const [audioToggle, setAudioToggle] = useState(false);

  /* 
#######################
# Methods / Functions #
####################### 
*/
  const fight = () => {
    setFightWasClicked(true);
  };

  const chooseAgain = () => {
    setPlayer1("");
    setPlayer2("");
  };

  const handleAudio = () => {
    if (audioToggle) {
      return (
        <audio loop autoPlay>
          <source src={Audio} type="audio/mpeg" />
          Audio tag is not supported in this browser.
        </audio>
      );
    } else {
      return (
        <audio muted loop autoPlay>
          <source src={Audio} type="audio/mpeg" />
          Audio tag is not supported in this browser.
        </audio>
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
      {/* Audio Section */}
      <Row className="bg-warning ms-1 me-auto p-2 rounded shadow">
        <Col>
          <Form>
            <Form.Check
              type="switch"
              id="audio switch"
              label={audioToggle ? "Sound On" : "Sound Off"}
              onClick={() => {
                setAudioToggle(!audioToggle);
              }}
            />
          </Form>
          {handleAudio()}
        </Col>
      </Row>
      {/* End */}
      {player1 && player2 && fightWasClicked ? (
        <VsScreens player1={player1} player2={player2} />
      ) : (
        <CharacterSelectionScreen
          player1={player1}
          player2={player2}
          selectionStep={selectionStep}
          selectPlayer={selectPlayer}
          fight={fight}
          chooseAgain={chooseAgain}
        />
      )}
    </>
  );
}
