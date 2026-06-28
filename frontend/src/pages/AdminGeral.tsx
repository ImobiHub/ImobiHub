import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface Imovel {
  id: number;
  descricao: string;
  localizacao: string;
  valor: number;
  tipoNegocio: string;
  nomeCorretor: string;
}

export default function AdminGeral() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  
  // Estados do Modal Nuvem
  const [modalAberto, setModalAberto] = useState(false);
  const [imovelEditando, setImovelEditando] = useState<Imovel | null>(null);
  
  // Campos do formulário
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipoNegocio, setTipoNegocio] = useState("Venda");

  const navigate = useNavigate();

  useEffect(() => {
    carregarImoveis();
  }, []);

  const carregarImoveis = async () => {
    try {
      const response = await api.get("/imoveis");
      setImoveis(response.data);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este imóvel?")) {
      try {
        await api.delete(`/imoveis/${id}`);
        setImoveis(imoveis.filter((imovel) => imovel.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const abrirModal = (imovel: Imovel) => {
    setImovelEditando(imovel);
    setDescricao(imovel.descricao);
    setLocalizacao(imovel.localizacao);
    setValor(imovel.valor);
    setTipoNegocio(imovel.tipoNegocio || "Venda");
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setImovelEditando(null);
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imovelEditando) return;

    try {
      await api.put(`/imoveis/${imovelEditando.id}`, {
        descricao,
        localizacao,
        valor,
        tipoNegocio
      });
      fecharModal();
      carregarImoveis();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      alert("Erro ao editar o imóvel.");
    }
  };

  const handleSair = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  // ==========================================
  // CÁLCULOS DO DASHBOARD
  // ==========================================
  const totalImoveis = imoveis.length;
  const valorTotal = imoveis.reduce((acc, curr) => acc + curr.valor, 0);
  const qtdVendas = imoveis.filter(i => i.tipoNegocio?.toLowerCase() === "venda" || i.tipoNegocio?.toLowerCase() === "vendas").length;
  const qtdAlugueis = totalImoveis - qtdVendas;

  // Agrupar imóveis por corretor
  const corretoresMap = new Map<string, number>();
  imoveis.forEach(i => {
    const nome = i.nomeCorretor || "Desconhecido";
    corretoresMap.set(nome, (corretoresMap.get(nome) || 0) + 1);
  });
  const corretoresStats = Array.from(corretoresMap.entries());
  const totalCorretores = corretoresStats.length;

  // DADOS FICTÍCIOS PARA O GRÁFICO (Último Trimestre)
  const dadosGrafico = [
    { mes: "Jan", vendas: 45, alugueis: 80 },
    { mes: "Fev", vendas: 60, alugueis: 65 },
    { mes: "Mar", vendas: 90, alugueis: 75 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F8EDD9", fontFamily: "'Inter', sans-serif" }}>
      
      {/* CABEÇALHO (NAVBAR) */}
      <header style={{ backgroundColor: "#01103A", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "#F8EDD9", fontSize: "22px", fontWeight: "700", letterSpacing: "1px" }}>
          Imobi<span style={{ color: "#B19F92" }}>Hub</span>
        </div>
        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <button onClick={handleSair} style={btnNavStyle}>Sair</button>
        </nav>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ flex: 1, padding: "40px 20px", color: "#01103A" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#01103A" }}>Overview do Sistema</h1>
            <p style={{ margin: "4px 0 0 0", color: "#919FAB", fontSize: "15px", fontWeight: "500" }}>Acompanhamento geral da ImobiHub</p>
          </div>

          {/* ÁREA SUPERIOR: CARDS + GRÁFICO */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
            
            {/* COLUNA ESQUERDA: CARDS DE ESTATÍSTICAS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", flex: "1 1 400px" }}>
              <div style={cardStyle}>
                <span style={cardLabelStyle}>Total de Imóveis</span>
                <h2 style={cardValueStyle}>{totalImoveis}</h2>
              </div>
              
              <div style={cardStyle}>
                <span style={cardLabelStyle}>Patrimônio Total</span>
                <h2 style={{...cardValueStyle, fontSize: "22px"}}>
                  {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h2>
              </div>

              <div style={cardStyle}>
                <span style={cardLabelStyle}>Vendas / Aluguéis</span>
                <h2 style={cardValueStyle}>{qtdVendas} <span style={{fontSize: "14px", color: "#919FAB", fontWeight: "normal"}}>vendas</span><br/>{qtdAlugueis} <span style={{fontSize: "14px", color: "#919FAB", fontWeight: "normal"}}>aluguéis</span></h2>
              </div>

              <div style={cardStyle}>
                <span style={cardLabelStyle}>Corretores Ativos ({totalCorretores})</span>
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px", maxHeight: "80px", overflowY: "auto" }}>
                  {corretoresStats.map(([nome, qtd]) => (
                    <div key={nome} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "#919FAB", fontWeight: "500" }}>{nome}</span>
                      <span style={{ fontWeight: "600", color: "#01103A" }}>{qtd}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: GRÁFICO COM VALORES */}
            <div style={{ ...cardStyle, flex: "1 1 500px", justifyContent: "space-between" }}>
              <div>
                <span style={cardLabelStyle}>Desempenho Trimestral (Fictício)</span>
                <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
                  <span style={{ fontSize: "12px", color: "#919FAB", display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "10px", height: "10px", backgroundColor: "#01103A", borderRadius: "2px" }}></div> Vendas
                  </span>
                  <span style={{ fontSize: "12px", color: "#919FAB", display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "10px", height: "10px", backgroundColor: "#B19F92", borderRadius: "2px" }}></div> Aluguéis
                  </span>
                </div>
              </div>
              
              {/* ESTRUTURA DO GRÁFICO EM CSS */}
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "180px", marginTop: "20px", borderBottom: "1px solid #919FAB", paddingBottom: "10px" }}>
                {dadosGrafico.map((dado) => (
                  <div key={dado.mes} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "60px" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", height: "140px" }}>
                      {/* Barra de Vendas com Número */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#01103A", marginBottom: "4px" }}>{dado.vendas}</span>
                        <div style={{ width: "20px", height: `${dado.vendas}%`, backgroundColor: "#01103A", borderRadius: "4px 4px 0 0", transition: "height 1s ease" }}></div>
                      </div>
                      {/* Barra de Aluguéis com Número */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#B19F92", marginBottom: "4px" }}>{dado.alugueis}</span>
                        <div style={{ width: "20px", height: `${dado.alugueis}%`, backgroundColor: "#B19F92", borderRadius: "4px 4px 0 0", transition: "height 1s ease" }}></div>
                      </div>
                    </div>
                    <span style={{ fontSize: "13px", color: "#01103A", fontWeight: "700" }}>{dado.mes}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* LISTAGEM DE IMÓVEIS */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: `1px solid #919FAB`, overflow: "hidden", boxShadow: "0 4px 20px rgba(1, 16, 58, 0.05)" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid #919FAB`, backgroundColor: "#F8EDD9" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#01103A" }}>Lista de Imóveis Cadastrados</h3>
            </div>
            
            <div style={{ padding: "0 24px" }}>
              {imoveis.map((imovel) => (
                <div key={imovel.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: "1px solid #e5e5e5" }}>
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#01103A" }}>{imovel.descricao}</h4>
                    <p style={{ margin: 0, color: "#919FAB", fontSize: "14px", fontWeight: "500" }}>
                      {imovel.localizacao} &bull; {imovel.tipoNegocio} &bull; Corretor: {imovel.nomeCorretor}
                    </p>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ fontWeight: "700", fontSize: "16px", color: "#01103A" }}>
                      {imovel.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => abrirModal(imovel)} style={btnLightStyle}>Editar</button>
                      <button onClick={() => handleExcluir(imovel.id)} style={btnDangerStyle}>Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
              {imoveis.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", color: "#919FAB", fontWeight: "500" }}>
                  Nenhum imóvel cadastrado no sistema ainda.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* RODAPÉ (FOOTER) */}
      <footer style={{ backgroundColor: "#01103A", color: "#919FAB", padding: "24px", textAlign: "center", borderTop: "4px solid #B19F92" }}>
        <p style={{ margin: 0, fontSize: "14px" }}>&copy; {new Date().getFullYear()} ImobiHub. Sistema de Gestão Imobiliária.</p>
      </footer>

      {/* MODAL NUVEM (FLUTUANTE) */}
      {modalAberto && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(1, 16, 58, 0.6)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          
          <div style={{ backgroundColor: "#F8EDD9", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", border: `2px solid #B19F92` }}>
            <h3 style={{ margin: "0 0 24px 0", fontSize: "20px", color: "#01103A", fontWeight: "700" }}>Editar Imóvel</h3>
            
            <form onSubmit={salvarEdicao} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Descrição</label>
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={inputStyle} required />
              </div>
              
              <div>
                <label style={labelStyle}>Localização</label>
                <input type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} style={inputStyle} required />
              </div>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Valor</label>
                  <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tipo</label>
                  <select value={tipoNegocio} onChange={(e) => setTipoNegocio(e.target.value)} style={inputStyle}>
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button type="submit" style={btnPrimaryStyle}>Salvar Alterações</button>
                <button type="button" onClick={fecharModal} style={{...btnLightStyle, backgroundColor: "#919FAB", color: "#fff"}}>Cancelar</button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}

// ==========================================
// ESTILOS COM A NOVA PALETA
// ==========================================
const navLinkStyle = {
  color: "#F8EDD9", textDecoration: "none", fontSize: "15px", fontWeight: "500", transition: "color 0.2s"
};
const btnNavStyle = {
  backgroundColor: "#B19F92", color: "#01103A", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "14px"
};
const cardStyle = {
  backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", border: `1px solid #919FAB`, display: "flex", flexDirection: "column" as const, justifyContent: "center", boxShadow: "0 4px 12px rgba(1, 16, 58, 0.04)"
};
const cardLabelStyle = {
  color: "#919FAB", fontSize: "13px", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase" as const, letterSpacing: "0.5px"
};
const cardValueStyle = {
  margin: 0, fontSize: "28px", fontWeight: "700", color: "#01103A"
};
const labelStyle = {
  display: "block", marginBottom: "6px", fontSize: "14px", color: "#01103A", fontWeight: "600"
};
const inputStyle = {
  width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid #919FAB`, backgroundColor: "#ffffff", fontSize: "15px", outline: "none", boxSizing: "border-box" as const, color: "#01103A"
};
const btnPrimaryStyle = {
  flex: 1, padding: "12px", backgroundColor: "#01103A", color: "#F8EDD9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "15px"
};
const btnLightStyle = {
  padding: "10px 16px", backgroundColor: "#B19F92", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", transition: "opacity 0.2s"
};
const btnDangerStyle = {
  padding: "10px 16px", backgroundColor: "transparent", color: "#01103A", border: `1px solid #01103A`, borderRadius: "6px", cursor: "pointer", fontWeight: "600"
};