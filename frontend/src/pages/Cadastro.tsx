import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [perfil, setPerfil] = useState("cliente");
  const [loading, setLoading] = useState(false);

  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Removido o endereço daqui também
      const dados = {
        Nome: nome,
        Email: email,
        Senha: senha,
        Telefone: telefone,
        Perfil: perfil 
      };

      await api.post("/cadastro", dados);
      
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate("/login"); 
      
    } catch (erro: any) {
      // Melhorando a mensagem de erro para o desenvolvedor ver no console (F12)
      console.error("Erro completo:", erro.response?.data || erro);
      alert("Erro ao realizar cadastro. Verifique o console para mais detalhes.");
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
          
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Criar Conta</h2>
          
          <form onSubmit={lidarComCadastro} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            <select value={perfil} onChange={(e) => setPerfil(e.target.value)} style={{...estiloInput, background: "#f0f8ff", borderColor: "#2196f3", fontWeight: "bold"}}>
              <option value="cliente">Sou um Cliente (Quero comprar/alugar)</option>
              <option value="corretor">Sou um Corretor (Quero anunciar imóveis)</option>
            </select>

            {/* Os campos obrigatorios estão marcados com o "required" no final */}
            <input placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} style={estiloInput} required />
            <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={estiloInput} required />
            <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={estiloInput} required />
            <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={estiloInput} required />
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: "15px", background: loading ? "#ccc" : "#f4b400", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
            Já tem uma conta? <span style={{ color: "#2196f3", cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/login")}>Faça login</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}