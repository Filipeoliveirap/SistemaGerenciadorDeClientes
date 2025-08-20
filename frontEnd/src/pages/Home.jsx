import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background:
          "linear-gradient(135deg, rgb(0, 123, 255), rgb(255, 0, 150))",
      }}
    >
      <Button variant="primary" size="lg" onClick={() => navigate("/clientes")}>
        Get Started
      </Button>
    </div>
  );
}
