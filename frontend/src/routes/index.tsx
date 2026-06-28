import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAÇÕES
import LandingPage from "../pages/LandingPage"; 
import Login from "../pages/Login";
import DetalhesImovel from "../pages/DetalhesImovel";
import PainelCorretor from "../pages/PainelCorretor";
import FormularioImovel from "../pages/FormularioImovel";
import AdminGeral from "../pages/AdminGeral";
import AdminLogin from "../pages/AdminLogin";
import Cadastro from "../pages/Cadastro";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Adicione a rota de CADASTRO que também estava faltando */}
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/imovel/:id" element={<DetalhesImovel />} />
        <Route path="/painel-corretor" element={<PainelCorretor />} />
        <Route path="/novo-anuncio" element={<FormularioImovel />} />
        <Route path="/editar-imovel/:id" element={<FormularioImovel />} />

        {/* 👇 AQUI ESTÃO AS ROTAS DO ADMIN QUE FALTAVAM 👇 */}
        <Route path="/admin" element={<AdminGeral />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}