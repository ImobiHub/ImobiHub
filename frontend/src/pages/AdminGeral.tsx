import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function AdminGeral() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    somaValor: 0,
    venda: 0,
    aluguel: 0,
    ticketMedio: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    if (user.perfil !== "admin") {
      alert("Acesso exclusivo para administradores!");
      navigate("/");
      return;
    }

    async function buscarDados() {
      try {
        const res = await api.get("/imoveis");
        const lista = res.data;

        const total = lista.length;
        const soma = lista.reduce((acc: number, item: any) => acc + Number(item.valor), 0);
        const vendas = lista.filter((i: any) => i.tipoNegocio === "Venda").length;
        const alugueis = lista.filter((i: any) => i.tipoNegocio === "Aluguel").length;

        setStats({
          total,
          somaValor: soma,
          venda: vendas,
          aluguel: alugueis,
          ticketMedio: total > 0 ? soma / total : 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    buscarDados();
  }, [navigate]);

  // ESTILOS PROFISSIONAIS
  const containerStyle = {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "40px 20px",
    width: "100%"
  };

  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #edf2f7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "transform 0.2s"
  };

  if (loading) return <Navbar />;

  return (
    <div style={{ background: "#f7fafc", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Navbar />

      <div style={containerStyle}>
        {/* CABECALHO */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", color: "#1a202c", margin: 0, fontWeight: "800" }}>Dashboard</h1>
            <p style={{ color: "#718096", margin: "5px 0 0 0" }}>Bem-vindo ao painel de controle do ImobiHub.</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => navigate("/painel-corretor")} style={{ padding: "12px 24px", background: "#2b6cb0", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              + Cadastrar Imovel
            </button>
          </div>
        </div>

        {/* GRID DE INDICADORES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          
          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total de Ativos</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <h2 style={{ fontSize: "2rem", margin: 0, color: "#2d3748" }}>{stats.total}</h2>
              <span style={{ background: "#ebf8ff", color: "#3182ce", padding: "8px", borderRadius: "8px", fontSize: "1.2rem" }}>🏢</span>
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Valor em Carteira</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <h2 style={{ fontSize: "1.8rem", margin: 0, color: "#2d3748" }}>
                {stats.somaValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h2>
              <span style={{ background: "#f0fff4", color: "#38a169", padding: "8px", borderRadius: "8px", fontSize: "1.2rem" }}>💰</span>
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ticket Medio</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <h2 style={{ fontSize: "1.8rem", margin: 0, color: "#2d3748" }}>
                {stats.ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h2>
              <span style={{ background: "#fffaf0", color: "#dd6b20", padding: "8px", borderRadius: "8px", fontSize: "1.2rem" }}>📈</span>
            </div>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Distribuicao</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
              <h2 style={{ fontSize: "1.6rem", margin: 0, color: "#2d3748" }}>
                {stats.venda} <small style={{ fontSize: "0.9rem", color: "#a0aec0", fontWeight: "normal" }}>vendas</small>
              </h2>
              <h2 style={{ fontSize: "1.6rem", margin: 0, color: "#2d3748" }}>
                {stats.aluguel} <small style={{ fontSize: "0.9rem", color: "#a0aec0", fontWeight: "normal" }}>alugueis</small>
              </h2>
            </div>
          </div>
        </div>

        {/* SECAO DE ANALISE (PLACEHOLDER PARA GRAFICOS) */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px" }}>
          <div style={{ ...cardStyle, padding: "30px" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#2d3748" }}>Performance Mensal</h3>
            <div style={{ height: "200px", background: "#f7fafc", borderRadius: "8px", border: "2px dashed #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#a0aec0" }}>
              Modulo de Graficos pronto para integracao (Chart.js)
            </div>
          </div>

          <div style={{ ...cardStyle, padding: "30px", background: "#2d3748", color: "#fff" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#fff" }}>Resumo de Operacoes</h3>
            <p style={{ color: "#a0aec0", fontSize: "0.9rem" }}>Ultimos 30 dias de atividade no portal ImobiHub em Joinville.</p>
            
            <div style={{ marginTop: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px solid #4a5568", paddingBottom: "10px" }}>
                <span>Novos Anuncios</span>
                <span style={{ color: "#68d391", fontWeight: "bold" }}>+12%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px solid #4a5568", paddingBottom: "10px" }}>
                <span>Interessados</span>
                <span style={{ color: "#68d391", fontWeight: "bold" }}>+45</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Visualizacoes</span>
                <span style={{ color: "#63b3ed", fontWeight: "bold" }}>1.2k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}