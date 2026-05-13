import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PainelCorretor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

    if (!usuario || (usuario.perfil !== "corretor" && usuario.perfil !== "admin")) {
      alert("Acesso negado!");
      navigate("/");
    }
  }, [navigate]);

  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [tipoNegocio, setTipoNegocio] = useState("Venda");
  const [quartos, setQuartos] = useState("0");
  const [vagas, setVagas] = useState("0");
  const [banheiros, setBanheiros] = useState("0");
  const [imagem, setImagem] = useState("");

  const estiloInput = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "1rem",
    marginTop: "8px",
    boxSizing: "border-box" as const
  };

  const estiloLabel = {
    fontWeight: "bold",
    color: "#555",
    fontSize: "0.9rem",
    display: "block",
    marginTop: "15px"
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div style={{ flexGrow: 1, padding: "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <header style={{ marginBottom: "30px" }}>
            <h1 style={{ margin: 0, color: "#1a1a1a" }}>Novo Anúncio</h1>
            <p style={{ color: "#666" }}>Preencha os dados abaixo para publicar o imóvel no portal.</p>
          </header>

          <form style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr", // Divide em 2 colunas: uma maior e uma menor
            gap: "30px" 
          }}>
            
            {/* COLUNA DA ESQUERDA: DADOS PRINCIPAIS */}
            <div style={{ 
              background: "#fff", 
              padding: "35px", 
              borderRadius: "16px", 
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)" 
            }}>
              <h3 style={{ borderBottom: "2px solid #f4b400", paddingBottom: "10px", marginBottom: "20px" }}>
                Informações de Venda
              </h3>

              <label style={estiloLabel}>Título do Anúncio</label>
              <input 
                placeholder="Ex: Apartamento Garden com Vista para o Mar" 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                style={estiloInput} 
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={estiloLabel}>Localização</label>
                  <input placeholder="Cidade - Bairro" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} style={estiloInput} />
                </div>
                <div>
                  <label style={estiloLabel}>Preço (R$)</label>
                  <input type="number" placeholder="0.00" value={valor} onChange={(e) => setValor(e.target.value)} style={estiloInput} />
                </div>
              </div>

              <div style={{ marginTop: "30px" }}>
                <label style={estiloLabel}>Tipo de Negócio</label>
                <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                  <button 
                    type="button"
                    onClick={() => setTipoNegocio("Venda")}
                    style={{ 
                      flex: 1, padding: "12px", borderRadius: "8px", cursor: "pointer", border: "none",
                      background: tipoNegocio === "Venda" ? "#f4b400" : "#eee",
                      color: tipoNegocio === "Venda" ? "#fff" : "#666",
                      fontWeight: "bold"
                    }}>Venda</button>
                  <button 
                    type="button"
                    onClick={() => setTipoNegocio("Aluguel")}
                    style={{ 
                      flex: 1, padding: "12px", borderRadius: "8px", cursor: "pointer", border: "none",
                      background: tipoNegocio === "Aluguel" ? "#4caf50" : "#eee",
                      color: tipoNegocio === "Aluguel" ? "#fff" : "#666",
                      fontWeight: "bold"
                    }}>Aluguel</button>
                </div>
              </div>
            </div>

            {/* COLUNA DA DIREITA: DETALHES E MÍDIA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              
              <div style={{ background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "15px" }}>Infraestrutura</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={estiloLabel}>Quartos</label>
                    <input type="number" value={quartos} onChange={(e) => setQuartos(e.target.value)} style={estiloInput} />
                  </div>
                  <div>
                    <label style={estiloLabel}>Vagas</label>
                    <input type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} style={estiloInput} />
                  </div>
                  <div>
                    <label style={estiloLabel}>Banheiros</label>
                    <input type="number" value={banheiros} onChange={(e) => setBanheiros(e.target.value)} style={estiloInput} />
                  </div>
                </div>
              </div>

              <div style={{ background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "15px" }}>Mídia</h3>
                <label style={estiloLabel}>URL da Foto Principal</label>
                <input placeholder="http://..." value={imagem} onChange={(e) => setImagem(e.target.value)} style={estiloInput} />
                
                {imagem && (
                  <img 
                    src={imagem} 
                    alt="Preview" 
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginTop: "15px", border: "1px solid #eee" }} 
                  />
                )}
              </div>

              <button 
                type="submit"
                style={{ 
                  padding: "18px", background: "#333", color: "#fff", border: "none", 
                  borderRadius: "12px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                }}
              >
                🚀 Publicar Imóvel
              </button>
            </div>

          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}