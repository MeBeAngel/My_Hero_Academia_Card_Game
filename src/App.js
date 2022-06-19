import React from "react";
import Screens from "./components/Screens/Screens";
import { Container } from "react-bootstrap";
import "./styles.css";

export default function App() {
  return (
    <Container
      fluid
      className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center py-2"
    >
      <Screens />
    </Container>
  );
}
