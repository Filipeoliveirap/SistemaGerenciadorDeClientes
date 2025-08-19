import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Button variant="primary" size="lg" onClick={() => navigate("/clientes")}>
        Get Started
      </Button>
    </Container>
  );
}
