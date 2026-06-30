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
    async function carregar() {
      try {
        const res = await api.get("/imoveis");
        const encontrado = res.data.find((item: any) => Number(item.id) === Number(id));
        setImovel(encontrado);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Carregando...</h2>;
  if (!imovel) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Imóvel não encontrado.</h2>;

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh" }}>
      <Navbar />
      
      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        {/* Header do Imóvel */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{imovel.descricao}</h1>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>📍 {imovel.localizacao}</p>
        </div>

        {/* Imagem Principal */}
        <img src={imovel.imagem || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"} 
             style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "20px", marginBottom: "30px" }} />

        {/* Grid de Conteúdo */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
          
          {/* Coluna Esquerda: Detalhes */}
          <section style={{ background: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <h3>Características</h3>
            <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
              {[
                { icon: "🛏️", label: "Quartos", val: imovel.quartos },
                { icon: "🚗", label: "Vagas", val: imovel.vagas },
                { icon: "🚿", label: "Banheiros", val: imovel.banheiros }
              ].map((item, idx) => (
                <div key={idx} style={{ background: "#f4f4f4", padding: "15px", borderRadius: "10px", flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                  <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{item.val}</div>
                  <div style={{ fontSize: "0.8rem", color: "#777" }}>{item.label}</div>
                </div>
              ))}
            </div>
            
            <h3>Descrição</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Imóvel incrível localizado em uma das melhores regiões da cidade. 
              Conta com acabamentos modernos, ótima ventilação e espaço bem distribuído. 
              Ideal para quem busca conforto e praticidade.
            </p>
          </section>

          {/* Coluna Direita: Valor e Contato */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <p style={{ margin: 0, color: "#888" }}>Preço</p>
              <h2 style={{ margin: "5px 0", fontSize: "1.8rem" }}>
                {Number(imovel.valor) > 0 ? Number(imovel.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Sob consulta"}
              </h2>
              <span style={{ background: "#eef", color: "#3366cc", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>{imovel.tipoNegocio}</span>
              
              <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />
              
              <p style={{ fontSize: "0.9rem", color: "#666" }}>Anunciado por: <strong>{imovel.nomeCorretor}</strong></p>
              
              <a href={`https://wa.me/5547999999999?text=Tenho interesse no imóvel ${imovel.descricao}`}
                 style={{ display: "block", background: "#25d366", color: "#fff", padding: "15px", textAlign: "center", borderRadius: "8px", textDecoration: "none", marginTop: "15px", fontWeight: "bold" }}>
                💬 Falar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}