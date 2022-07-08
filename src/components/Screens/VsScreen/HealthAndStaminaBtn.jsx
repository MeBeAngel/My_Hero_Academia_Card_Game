import React from "react";
import HealthIcon from "../../../assets/health.svg";
import StaminaIcon from "../../../assets/stamina.svg";

export default function HealthAndStaminaBtn({
  xPosition,
  supportReady,
  player,
  onClick
}) {
  // Handle whether the div is positioned absolutely to the left or right of the card
  // depending on the value of props.xPosition
  const handleXPosition = () => {
    let style = { top: 0, width: "35px" };

    if (xPosition === "left") {
      return { ...style, left: "-47px" };
    } else if (xPosition === "right") {
      return { ...style, right: "-47px" };
    } else {
      console.log(
        'INVALID PROP VALUE:: xPosition Value must either be "left" or "right"'
      );
      return {};
    }
  };
  return (
    <div className="absolute" style={handleXPosition()}>
      {/* Health and Stamina Button section. 
            Both Buttons are positioned absolutely, relative to the Card element.  */}
      <img
        id="support_health"
        className={`shadow rounded border-0 p-0 m-0 mb-2 ${
          supportReady ? "bg-danger" : "bg-secondary"
        }`}
        name={player}
        onClick={onClick}
        src={HealthIcon}
        alt=""
        style={{
          width: "100%",
          height: "35px",
          cursor: `${supportReady ? "pointer" : ""}`
        }}
      />

      <img
        id="support_stamina"
        className={`shadow rounded border-0 p-0 m-0 ${
          supportReady ? "bg-warning" : "bg-secondary"
        }`}
        name={player}
        onClick={onClick}
        src={StaminaIcon}
        alt=""
        style={{
          width: "100%",
          height: "35px",
          cursor: `${supportReady ? "pointer" : ""}`
        }}
      />
      {/* End */}
    </div>
  );
}
