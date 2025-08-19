import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes";

import React from "react";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<Cliente />} />
    </Routes>
  );
}
