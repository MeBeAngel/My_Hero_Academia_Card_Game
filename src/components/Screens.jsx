import React, { useState } from "react";
import CharacterSelectionScreen from "./CharacterSelectScreen";
import VsScreens from "./VsScreen";

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

  /* 
###############
# Main Return #
############### 
*/
  return (
    <>
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
