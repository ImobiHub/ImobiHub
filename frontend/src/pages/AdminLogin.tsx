import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [idAcesso, setIdAcesso] = useState("");
  const [chaveAcesso, setChaveAcesso] = useState("");

  const lidarComLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simplificada para fins acadêmicos
    if (idAcesso === "admin" && chaveAcesso === "12345") {
      // Criamos um "crachá" de admin no navegador
      const usuarioAdmin = { 
        nome: "Administrador do Sistema", 
        perfil: "admin" 
      };
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAdmin));

      alert("Acesso Administrativo Concedido! Bem-vindo.");
      navigate("/dashboard-admin"); // Manda para a página de estatísticas
    } else {
      alert("ID ou Chave de Acesso incorretos. Tente novamente.");
    }
  };

  const estiloInput = {
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "15px"
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ 
          background: "#fff", 
          padding: "40px", 
          borderRadius: "16px", 
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)", 
          width: "100%", 
          maxWidth: "400px",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#333" }}>Acesso Restrito</h1>
          <p style={{ color: "#777", marginBottom: "30px" }}>Entre com suas credenciais de administrador.</p>

          <form onSubmit={lidarComLoginAdmin}>
            <input 
              placeholder="ID de Acesso" 
              value={idAcesso} 
              onChange={(e) => setIdAcesso(e.target.value)} 
              style={estiloInput} 
              required 
            />
            <input 
              placeholder="Chave de Acesso" 
              type="password" 
              value={chaveAcesso} 
              onChange={(e) => setChaveAcesso(e.target.value)} 
              style={estiloInput} 
              required 
            />

            <button 
              type="submit"
              style={{ 
                width: "100%", 
                padding: "15px", 
                background: "#2196f3", 
                color: "#fff", 
                border: "none", 
                borderRadius: "8px", 
                fontSize: "1.1rem", 
                fontWeight: "bold", 
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
              }}
            >
              Acessar Dashboard
            </button>
          </form>

          <p style={{ marginTop: "20px", color: "#999", fontSize: "0.85rem" }}>
            Área monitorada. Acesso exclusivo para gestores ImobiHub.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}