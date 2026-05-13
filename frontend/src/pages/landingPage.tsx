import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardImovel from "../components/CardImovel";

export default function LandingPage() {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [imoveisFiltrados, setImoveisFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DOS INPUTS (O que o usuário digita) ---
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [quartos, setQuartos] = useState("");
  const [maxPreco, setMaxPreco] = useState("");

  useEffect(() => {
    async function carregarImoveis() {
      try {
        const resposta = await api.get("/imoveis");
        setImoveis(resposta.data);
        setImoveisFiltrados(resposta.data); // Inicialmente mostra tudo
      } catch (erro) {
        console.error("Erro ao carregar imoveis:", erro);
      } finally {
        setLoading(false);
      }
    }
    carregarImoveis();
  }, []);

  // --- FUNÇÃO PARA APLICAR OS FILTROS ---
  const aplicarFiltros = () => {
    const resultado = imoveis.filter((imovel) => {
      const termo = busca.toLowerCase();
      const matchBusca = imovel.descricao?.toLowerCase().includes(termo) ||
                         imovel.localizacao?.toLowerCase().includes(termo);
      
      const matchTipo = tipo ? imovel.tipoNegocio === tipo : true;
      const matchQuartos = quartos ? imovel.quartos >= Number(quartos) : true;
      const matchPreco = maxPreco ? Number(imovel.valor) <= Number(maxPreco) : true;

      return matchBusca && matchTipo && matchQuartos && matchPreco;
    });
    setImoveisFiltrados(resultado);
  };

  // --- FUNÇÃO PARA REMOVER TUDO ---
  const limparFiltros = () => {
    setBusca("");
    setTipo("");
    setQuartos("");
    setMaxPreco("");
    setImoveisFiltrados(imoveis); // Volta a lista completa
  };

  const filterInputStyle = {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    background: "#fff",
    color: "#4a5568",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1a202c", minHeight: "100vh" }}>
      <Navbar />

      {/* SEÇÃO HERO */}
      <section style={{ 
        padding: "80px 20px", 
        textAlign: "center", 
        background: "linear-gradient(to bottom, #f8fafc, #fff)",
        borderBottom: "1px solid #eee"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "30px", letterSpacing: "-0.02em" }}>
            Encontre o seu lugar em Joinville com a ImobiHub.
          </h1>

          {/* PAINEL DE BUSCA */}
          <div style={{ 
            background: "#fff", 
            padding: "25px", 
            borderRadius: "20px", 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <input 
              type="text" 
              placeholder="Pesquise por bairro, rua ou tipo de imovel..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ ...filterInputStyle, fontSize: "1rem" }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={filterInputStyle}>
                <option value="">Negocio (Todos)</option>
                <option value="Venda">Comprar</option>
                <option value="Aluguel">Alugar</option>
              </select>

              <select value={quartos} onChange={(e) => setQuartos(e.target.value)} style={filterInputStyle}>
                <option value="">Quartos</option>
                <option value="1">1+ Quarto</option>
                <option value="2">2+ Quartos</option>
                <option value="3">3+ Quartos</option>
              </select>

              <input 
                type="number" 
                placeholder="Preço Máximo" 
                value={maxPreco}
                onChange={(e) => setMaxPreco(e.target.value)}
                style={filterInputStyle}
              />

              {/* BOTÃO FILTRAR */}
              <button 
                onClick={aplicarFiltros}
                style={{ 
                  background: "#2b6cb0", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "8px", 
                  fontWeight: "700", 
                  cursor: "pointer",
                  padding: "12px"
                }}
              >
                🔍 Filtrar
              </button>

              {/* BOTÃO REMOVER */}
              <button 
                onClick={limparFiltros}
                style={{ 
                  background: "#fff", 
                  color: "#e53e3e", 
                  border: "1px solid #fed7d7", 
                  borderRadius: "8px", 
                  fontWeight: "700", 
                  cursor: "pointer",
                  padding: "12px"
                }}
              >
                🗑️ Limpar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LISTAGEM */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "700" }}>Imoveis em Destaque</h2>
          <p style={{ color: "#718096" }}>Exibindo {imoveisFiltrados.length} propriedades.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px" }}>Carregando...</div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
            gap: "35px" 
          }}>
            {imoveisFiltrados.map((imovel) => (
              <CardImovel key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}

        {!loading && imoveisFiltrados.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px", background: "#f8fafc", borderRadius: "20px" }}>
            <h3 style={{ color: "#2d3748" }}>Nenhum resultado para esses filtros.</h3>
            <button onClick={limparFiltros} style={{ color: "#2b6cb0", background: "none", border: "none", textDecoration: "underline", cursor: "pointer", marginTop: "10px" }}>
              Ver todos os imoveis novamente
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}