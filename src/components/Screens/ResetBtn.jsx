import React from "react";
import refreshPage from "../../shared/refreshPage";
import { Button } from "react-bootstrap";

export default function RefreshBtn() {
  return (
    <Button
      className="reset-btn bg-warning text-dark p-3 shadow"
      onClick={refreshPage}
    >
      Reset Game
    </Button>
  );
}
