import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminGeral() {
  const navigate = useNavigate();
  
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- NOVO: ESTADO DO MODAL DE EDIÇÃO ---
  const [imovelEditando, setImovelEditando] = useState<any>(null);
  
  const [stats, setStats] = useState({
    total: 0,
    somaValor: 0,
    venda: 0,
    aluguel: 0,
    ticketMedio: 0
  });

  const carregarDados = async () => {
    try {
      const res = await api.get("/imoveis");
      const lista = res.data;

      setImoveis(lista);

      const total = lista.length;
      const soma = lista.reduce((acc: number, item: any) => acc + Number(item.valor || 0), 0);
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
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    if (user.perfil !== "admin") {
      toast.error("Acesso exclusivo para administradores!");
      navigate("/");
      return;
    }
    carregarDados();
  }, [navigate]);

  const deletarImovel = async (id: number) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.");
    if (confirmacao) {
      try {
        await api.delete(`/imoveis/${id}`);
        toast.success("Imóvel excluído com sucesso!");
        carregarDados(); 
      } catch (error) {
        console.error("Erro ao deletar:", error);
        toast.error("Erro ao excluir o imóvel. Tente novamente.");
      }
    }
  };

  // --- O "U" DO CRUD: FUNÇÃO DE ATUALIZAR ---
  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o form
    
    try {
      // Faz um PUT para a API enviando o objeto atualizado
      await api.put(`/imoveis/${imovelEditando.id}`, imovelEditando);
      toast.success("Imóvel excluído com sucesso!");
      setImovelEditando(null); // Fecha o modal
      carregarDados(); // Recarrega os dados na tela
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao salvar as alterações. Verifique os dados.");
    }
  };

  const containerStyle = { maxWidth: "1300px", margin: "0 auto", padding: "40px 20px", width: "100%" };
  const cardStyle = { background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #edf2f7", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" };
  const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0", marginBottom: "15px", fontFamily: "'Inter', sans-serif" };

  if (loading) return <Navbar />;

  return (
    <div style={{ background: "#f7fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <div style={containerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", color: "#1a202c", margin: 0, fontWeight: "800" }}>Dashboard</h1>
            <p style={{ color: "#718096", margin: "5px 0 0 0" }}>Painel de Controle ImobiHub</p>
          </div>
          <button onClick={() => navigate("/painel-corretor")} style={{ padding: "12px 24px", background: "#2b6cb0", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
            + Novo Imóvel
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase" }}>Total de Ativos</p>
            <h2 style={{ fontSize: "2rem", margin: "10px 0 0 0", color: "#2d3748" }}>{stats.total}</h2>
          </div>
          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase" }}>Valor em Carteira</p>
            <h2 style={{ fontSize: "1.8rem", margin: "10px 0 0 0", color: "#2d3748" }}>{stats.somaValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
          </div>
          <div style={cardStyle}>
            <p style={{ color: "#718096", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase" }}>Distribuição</p>
            <h2 style={{ fontSize: "1.6rem", margin: "10px 0 0 0", color: "#2d3748" }}>{stats.venda} Venda / {stats.aluguel} Aluguel</h2>
          </div>
        </div>

        <div style={{ ...cardStyle, padding: "0", overflow: "hidden" }}>
          <div style={{ padding: "20px 25px", borderBottom: "1px solid #edf2f7", background: "#f8fafc" }}>
            <h3 style={{ margin: 0, color: "#2d3748", fontSize: "1.2rem" }}>Gerenciamento de Imóveis</h3>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "#edf2f7", color: "#4a5568", fontSize: "0.85rem", textTransform: "uppercase" }}>
                <tr>
                  <th style={{ padding: "15px 25px", fontWeight: "600" }}>ID</th>
                  <th style={{ padding: "15px 25px", fontWeight: "600" }}>Descrição</th>
                  <th style={{ padding: "15px 25px", fontWeight: "600" }}>Localização</th>
                  <th style={{ padding: "15px 25px", fontWeight: "600" }}>Negócio</th>
                  <th style={{ padding: "15px 25px", fontWeight: "600" }}>Valor</th>
                  <th style={{ padding: "15px 25px", fontWeight: "600", textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {imoveis.map((imovel) => (
                  <tr key={imovel.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                    <td style={{ padding: "15px 25px", color: "#718096" }}>#{imovel.id}</td>
                    <td style={{ padding: "15px 25px", color: "#2d3748", fontWeight: "500" }}>{imovel.descricao}</td>
                    <td style={{ padding: "15px 25px", color: "#4a5568" }}>{imovel.localizacao}</td>
                    <td style={{ padding: "15px 25px" }}>
                      <span style={{ background: imovel.tipoNegocio === "Aluguel" ? "#c6f6d5" : "#bee3f8", color: imovel.tipoNegocio === "Aluguel" ? "#22543d" : "#2a4365", padding: "4px 10px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: "600" }}>
                        {imovel.tipoNegocio}
                      </span>
                    </td>
                    <td style={{ padding: "15px 25px", color: "#2d3748", fontWeight: "600" }}>
                      {Number(imovel.valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td style={{ padding: "15px 25px", textAlign: "center", display: "flex", gap: "10px", justifyContent: "center" }}>
                      
                      {/* BOTÃO EDITAR QUE ABRE O MODAL */}
                      <button 
                        onClick={() => setImovelEditando(imovel)} // Copia os dados do imóvel para o estado
                        style={{ background: "#ebf4ff", color: "#3182ce", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        ✏️ Editar
                      </button>
                      
                      <button 
                        onClick={() => deletarImovel(imovel.id)}
                        style={{ background: "#fff5f5", color: "#e53e3e", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        🗑️ Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {imovelEditando && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", width: "100%", maxWidth: "500px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ margin: "0 0 20px 0", color: "#1a202c" }}>Editar Imóvel #{imovelEditando.id}</h2>
            
            <form onSubmit={salvarEdicao}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "#4a5568", marginBottom: "5px" }}>Descrição</label>
              <input type="text" value={imovelEditando.descricao} onChange={(e) => setImovelEditando({...imovelEditando, descricao: e.target.value})} style={inputStyle} required />

              <label style={{ display: "block", fontSize: "0.9rem", color: "#4a5568", marginBottom: "5px" }}>Localização</label>
              <input type="text" value={imovelEditando.localizacao} onChange={(e) => setImovelEditando({...imovelEditando, localizacao: e.target.value})} style={inputStyle} required />

              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.9rem", color: "#4a5568", marginBottom: "5px" }}>Valor (R$)</label>
                  <input type="number" step="0.01" value={imovelEditando.valor} onChange={(e) => setImovelEditando({...imovelEditando, valor: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.9rem", color: "#4a5568", marginBottom: "5px" }}>Negócio</label>
                  <select value={imovelEditando.tipoNegocio} onChange={(e) => setImovelEditando({...imovelEditando, tipoNegocio: e.target.value})} style={inputStyle}>
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setImovelEditando(null)} style={{ flex: 1, padding: "12px", background: "#edf2f7", color: "#4a5568", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: "12px", background: "#2b6cb0", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}