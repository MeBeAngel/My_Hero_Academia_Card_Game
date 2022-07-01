import React, { useState, useEffect } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import CharacterSelectionScreen from "./CharacterSelectScreen/CharacterSelectScreen";
import VsScreens from "./VsScreen/VsScreen";
import mainAudio from "../../assets/audio/Symbol_of_Peace.MP3";
import battleAudio from "../../assets/audio/battleAudio.mp3";

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

  const [show, setShow] = useState(true);

  useEffect(() => {
    const mainAudio = document.getElementById("mainAudio");
    const battleAudio = document.getElementById("battleAudio");

    if (audioToggle && !fightWasClicked) {
      mainAudio.play();
      battleAudio.pause();
      battleAudio.currentTime = 0;
    }
    if (audioToggle && fightWasClicked) {
      battleAudio.play();
      mainAudio.pause();
      mainAudio.currentTime = 0;
    }
  }, [audioToggle, fightWasClicked]);

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
        <>
          {/* Main Audio */}
          <audio id="mainAudio" loop autoPlay>
            <source src={mainAudio} type="audio/mpeg" />
            Audio tag is not supported in this browser.
          </audio>
          {/* Battle Audio */}
          <audio id="battleAudio" loop autoPlay>
            <source src={battleAudio} type="audio/mpeg" />
            Audio tag is not supported in this browser.
          </audio>
        </>
      );
    } else {
      return (
        <>
          {/* Main Audio */}
          <audio id="mainAudio" preload loop muted>
            <source
              src={fightWasClicked ? battleAudio : mainAudio}
              type="audio/mpeg"
            />
            Audio tag is not supported in this browser.
          </audio>
          {/* Battle Audio */}
          <audio id="battleAudio" preload loop muted>
            <source src={battleAudio} type="audio/mpeg" />
            Audio tag is not supported in this browser.
          </audio>
        </>
      );
    }
  };

  const toggleModal = () => setShow(!show);

  /* 
###############
# Main Return #
############### 
*/
  return (
    <>
      <Modal
        contentClassName="bg-warning rounded shadow border-3 border-primary"
        show={show}
        onHide={toggleModal}
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Modal.Header className="border-0">
          <Modal.Title>Gameplay Tip!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>This game is much more fun with sound.</h5>{" "}
          <h5>Don't forget to turn it on!</h5>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
