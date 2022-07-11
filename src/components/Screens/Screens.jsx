import React, { useState, useEffect } from "react";
import { Row, Col, Form, Modal, Button, Carousel } from "react-bootstrap";
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
          <audio id="mainAudio" loop muted>
            <source
              src={fightWasClicked ? battleAudio : mainAudio}
              type="audio/mpeg"
            />
            Audio tag is not supported in this browser.
          </audio>
          {/* Battle Audio */}
          <audio id="battleAudio" loop muted>
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
      {/* Modal Section */}
      <Modal
        contentClassName="bg-warning rounded shadow border-3 border-primary text-center"
        show={show}
        onHide={toggleModal}
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Modal.Header className="border-0">
          <Modal.Title>
            <h3>Welcome to MHA Card Battle!</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <h4>Gameplay Tips and updates!</h4>
          <Carousel
            className="bg-light text-center p-2"
            indicators={false}
            controls={false}
            interval={3000}
          >
            <Carousel.Item>
              <h5 className="m-0">This game is much more fun with sound.</h5>
              <p className="m-0">Make sure to turn it ON!</p>
            </Carousel.Item>
            <Carousel.Item>
              <h5 className="m-0">Grab a friend.</h5>
              <p className="m-0">Computer player support coming soon!</p>
            </Carousel.Item>
            {/* <Carousel.Item>
              <h5 className="m-0">This is another gameplay hint</h5>
              <p>What will it be</p>
            </Carousel.Item> */}
          </Carousel>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End */}
      {/* Audio Section */}
      <Row className="bg-warning ms-1 me-auto mb-2 p-2 rounded shadow">
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
