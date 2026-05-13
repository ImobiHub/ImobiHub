import { Routes, Route } from "react-router-dom";
import Home from "../pages/landingPage"; // Caminho que você quer manter
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import DetalhesImovel from "../pages/DetalhesImovel";
import AdminLogin from "../pages/AdminLogin";
import AdminGeral from "../pages/AdminGeral";
import PainelCorretor from "../pages/PainelCorretor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/imovel/:id" element={<DetalhesImovel />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard-admin" element={<AdminGeral />} />
      <Route path="/painel-corretor" element={<PainelCorretor />} />
    </Routes>
  );
}