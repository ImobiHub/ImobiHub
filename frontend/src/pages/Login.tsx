import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const lidarComLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resposta = await api.post("/login", { email, senha });
      
      // O C# nos devolveu: id, nome, perfil e mensagem.
      const dadosUsuario = resposta.data;

      // Salvamos o "crachá" no navegador para o React não esquecer quem está logado
      localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));

      alert(`Bem-vindo(a), ${dadosUsuario.nome}!`);
      
      // Conforme você pediu, todo mundo que loga vai pra Landing Page
      navigate("/"); 
      
    } catch (erro) {
      console.error("Erro no login:", erro);
      alert("Credenciais incorretas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const estiloInput = {
    padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem", width: "100%", boxSizing: "border-box" as const
  };

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
          
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Acessar ImobiHub</h2>
          
          <form onSubmit={lidarComLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* O campo de e-mail agora aceita o ID "admin" também */}
            <input placeholder="E-mail ou ID de Acesso" value={email} onChange={(e) => setEmail(e.target.value)} style={estiloInput} required />
            <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={estiloInput} required />
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: "15px", background: loading ? "#ccc" : "#2196f3", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
            Não tem uma conta? <span style={{ color: "#f4b400", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/cadastro")}>Cadastre-se</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}