import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
}
