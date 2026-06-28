import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardImovel from "../components/CardImovel";

export default function LandingPage() {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [imoveisFiltrados, setImoveisFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [vagas, setVagas] = useState("");
  const [maxPreco, setMaxPreco] = useState("");

  useEffect(() => {
    async function carregarImoveis() {
      try {
        const resposta = await api.get("/imoveis");
        setImoveis(resposta.data);
        setImoveisFiltrados(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar imoveis:", erro);
      } finally {
        setLoading(false);
      }
    }
    carregarImoveis();
  }, []);

  const aplicarFiltros = () => {
    const resultado = imoveis.filter((imovel) => {
      const termo = busca.toLowerCase();
      const matchBusca = imovel.descricao?.toLowerCase().includes(termo) ||
                         imovel.localizacao?.toLowerCase().includes(termo);
      
      const matchTipo = tipo ? imovel.tipoNegocio === tipo : true;
      
      // Filtros exatos conforme solicitado
      const matchQuartos = quartos ? imovel.quartos === Number(quartos) : true;
      const matchBanheiros = banheiros ? imovel.banheiros === Number(banheiros) : true;
      const matchVagas = vagas ? imovel.vagas === Number(vagas) : true;
      
      const matchPreco = maxPreco ? Number(imovel.valor) <= Number(maxPreco) : true;
      
      return matchBusca && matchTipo && matchQuartos && matchBanheiros && matchVagas && matchPreco;
    });
    setImoveisFiltrados(resultado);
  };

  const limparFiltros = () => {
    setBusca(""); setTipo(""); setQuartos(""); setBanheiros(""); setVagas(""); setMaxPreco("");
    setImoveisFiltrados(imoveis);
  };

  const inputStyle = {
    padding: "10px 0", border: "none", borderBottom: "2px solid #B19F92",
    background: "transparent", fontSize: "0.9rem", color: "#01103A", outline: "none", width: "100%"
  };

  return (
    <div style={{ background: "#F8EDD9", color: "#01103A", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" }}>
        
        <section style={{ marginBottom: "60px" }}>
          {/* TÍTULO CHAMATIVO */}
          <h1 style={{ fontSize: "3.5rem", fontWeight: "300", textAlign: "center", marginBottom: "15px", lineHeight: "1.1" }}>
            Encontre o seu lugar perfeito com a <span style={{ fontWeight: "700", color: "#01103A" }}>ImobiHub</span>.
          </h1>
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#919FAB", marginBottom: "40px" }}>
            Conectamos você ao imóvel dos seus sonhos com agilidade e exclusividade.
          </p>

          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", border: "1px solid #e5e5e5", boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px", marginBottom: "20px" }}>
              <input type="text" placeholder="Bairro ou cidade..." value={busca} onChange={(e) => setBusca(e.target.value)} style={inputStyle} />
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={inputStyle}><option value="">Negócio</option><option value="Venda">Venda</option><option value="Aluguel">Aluguel</option></select>
              <input type="number" placeholder="Preço Máx." value={maxPreco} onChange={(e) => setMaxPreco(e.target.value)} style={inputStyle} />
              <input type="number" placeholder="Quartos" value={quartos} onChange={(e) => setQuartos(e.target.value)} style={inputStyle} />
              <input type="number" placeholder="Banheiros" value={banheiros} onChange={(e) => setBanheiros(e.target.value)} style={inputStyle} />
              <input type="number" placeholder="Vagas" value={vagas} onChange={(e) => setVagas(e.target.value)} style={inputStyle} />
            </div>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={limparFiltros} style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #01103A", background: "transparent", color: "#01103A", fontWeight: "600", cursor: "pointer" }}>
                Limpar Filtros
              </button>
              <button onClick={aplicarFiltros} style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#01103A", color: "#F8EDD9", fontWeight: "600", cursor: "pointer" }}>
                Buscar Imóveis
              </button>
            </div>
          </div>
        </section>

        <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "30px", color: "#919FAB" }}>
          {imoveisFiltrados.length} propriedades encontradas
        </h2>

        {loading ? <p>Carregando...</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
            {imoveisFiltrados.map((imovel) => (
              <CardImovel key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}