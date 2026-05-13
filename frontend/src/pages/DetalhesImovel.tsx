import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function DetalhesImovel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const resposta = await api.get("/imoveis");
        // O find precisa comparar com item.id (que vem do C#)
        const imovelEncontrado = resposta.data.find((item: any) => item.id === Number(id));
        setImovel(imovelEncontrado);
      } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
      } finally {
        setLoading(false);
      }
    }
    carregarDetalhes();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Carregando detalhes...</h2>;
  
  // Se não encontrar o imóvel, ele avisa em vez de travar a tela
  if (!imovel) return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Imóvel não encontrado.</h2>
      <button onClick={() => navigate("/")}>Voltar para Home</button>
    </div>
  );

  // Ajuste da imagem: usamos 'imagem' que é o nome que vem do C#
  const imagemExibida = (imovel.imagem && imovel.imagem !== "NULL") 
    ? imovel.imagem 
    : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200";

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "20px" }}>
        <button 
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}
        >
          ← Voltar para a busca
        </button>

        {/* Usamos 'descricao' que é o nome vindo do banco */}
        <h1 style={{ fontSize: "2.3rem", color: "#1a1a1a", marginBottom: "10px" }}>{imovel.descricao}</h1>
        <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "20px" }}>📍 {imovel.localizacao}</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "0 20px" }}>
        <img 
          src={imagemExibida} 
          alt={imovel.descricao} 
          style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "16px" }} 
        />
      </div>

      <div style={{ 
        maxWidth: "1200px", 
        margin: "40px auto", 
        width: "100%", 
        padding: "0 20px",
        display: "grid",
        gridTemplateColumns: "1.8fr 1fr",
        gap: "40px"
      }}>
        
        <div>
          <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: "20px", marginBottom: "20px" }}>Sobre este imóvel</h2>
          
          <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
            <div style={{ textAlign: "center", padding: "15px", background: "#f8f9fa", borderRadius: "12px", minWidth: "100px" }}>
              <span style={{ display: "block", fontSize: "1.5rem" }}>🛏️</span>
              <strong style={{ display: "block", fontSize: "1.2rem", marginTop: "5px" }}>{imovel.quartos}</strong>
              <span style={{ fontSize: "0.8rem", color: "#666" }}>Quartos</span>
            </div>
            <div style={{ textAlign: "center", padding: "15px", background: "#f8f9fa", borderRadius: "12px", minWidth: "100px" }}>
              <span style={{ display: "block", fontSize: "1.5rem" }}>🚗</span>
              <strong style={{ display: "block", fontSize: "1.2rem", marginTop: "5px" }}>{imovel.vagas}</strong>
              <span style={{ fontSize: "0.8rem", color: "#666" }}>Vagas</span>
            </div>
            <div style={{ textAlign: "center", padding: "15px", background: "#f8f9fa", borderRadius: "12px", minWidth: "100px" }}>
              <span style={{ display: "block", fontSize: "1.5rem" }}>🚿</span>
              <strong style={{ display: "block", fontSize: "1.2rem", marginTop: "5px" }}>{imovel.banheiros}</strong>
              <span style={{ fontSize: "0.8rem", color: "#666" }}>Banh.</span>
            </div>
          </div>

          <p style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem" }}>
            Excelente oportunidade em <strong>{imovel.localizacao}</strong>. 
            Imóvel com ambientes amplos e ótima iluminação natural. 
            Perfeito para quem busca morar bem em Joinville e região.
          </p>
        </div>

        <aside>
          <div style={{ 
            background: "#fff", 
            border: "1px solid #eee", 
            padding: "30px", 
            borderRadius: "16px", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            position: "sticky",
            top: "20px"
          }}>
            <span style={{ 
              background: imovel.tipoNegocio === "Aluguel" ? "#4caf50" : "#2196f3", 
              color: "#fff", 
              padding: "5px 12px", 
              borderRadius: "4px", 
              fontWeight: "bold",
              fontSize: "0.8rem",
              textTransform: "uppercase"
            }}>
              {imovel.tipoNegocio}
            </span>

            <div style={{ marginTop: "20px", marginBottom: "30px" }}>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Valor Total</p>
              {/* CORREÇÃO AQUI: Mudado de imovel.preco para imovel.valor */}
              <h2 style={{ margin: 0, fontSize: "2.2rem", color: "#333", fontWeight: "800" }}>
                {Number(imovel.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                {imovel.tipoNegocio === "Aluguel" && <span style={{ fontSize: "1rem", fontWeight: "normal" }}> /mês</span>}
              </h2>
            </div>

            <div style={{ 
              padding: "20px 0", 
              borderTop: "1px solid #eee", 
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#f4b400", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>
                C
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>Anunciado por:</p>
                <strong style={{ fontSize: "1rem", color: "#333" }}>Corretor Parceiro</strong>
              </div>
            </div>

            <button style={{ 
              width: "100%", 
              padding: "18px", 
              background: "#25d366", 
              color: "#fff", 
              border: "none", 
              borderRadius: "10px", 
              fontSize: "1.1rem", 
              fontWeight: "bold", 
              cursor: "pointer"
            }}>
              💬 Falar no WhatsApp
            </button>
          </div>
        </aside>

      </div>
      <Footer />
    </div>
  );
}