import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Imovel {
  id?: number;
  descricao: string; 
  localizacao: string;
  valor: number;
  tipoNegocio: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  fk_corretor?: number; 
}

export default function PainelCorretor() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  
  const [modalAberto, setModalAberto] = useState<"novo" | "editar" | null>(null);
  
  const estadoInicial = { descricao: "", localizacao: "", valor: 0, tipoNegocio: "Venda", quartos: 0, banheiros: 0, vagas: 0 };
  const [formData, setFormData] = useState<Imovel>(estadoInicial);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    carregarImoveis();
  }, []);

  const carregarImoveis = async () => {
    try {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
      const id = usuarioLogado.id; 
      
      if (id) {
        const response = await api.get(`/imoveis/corretor/${id}`);
        setImoveis(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
  };

  const abrirModalNovo = () => {
    setFormData(estadoInicial);
    setIdEditando(null);
    setModalAberto("novo");
  };

  const abrirModalEditar = (imovel: Imovel) => {
    setFormData({
      descricao: imovel.descricao || "",
      localizacao: imovel.localizacao || "",
      valor: imovel.valor || 0,
      tipoNegocio: imovel.tipoNegocio || "Venda",
      quartos: imovel.quartos || 0,
      banheiros: imovel.banheiros || 0,
      vagas: imovel.vagas || 0,
      fk_corretor: imovel.fk_corretor
    });
    setIdEditando(imovel.id || null);
    setModalAberto("editar");
  };

  const fecharModal = () => {
    setModalAberto(null);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    const fk_corretor = usuarioLogado.id;

    if (!fk_corretor) {
      alert("Erro: Sessão inválida. Faça login novamente.");
      return;
    }

    const payload = { ...formData, fk_corretor };

    try {
      if (modalAberto === "novo") {
        await api.post("/imoveis", payload);
      } else if (modalAberto === "editar" && idEditando) {
        await api.put(`/imoveis/${idEditando}`, payload);
      }
      
      fecharModal();
      carregarImoveis();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar o imóvel. Verifique o console.");
    }
  };

  const handleExcluir = async (id?: number) => {
    if (!id) return;
    if (window.confirm("Tem certeza que deseja remover este anúncio?")) {
      try {
        await api.delete(`/imoveis/${id}`);
        setImoveis(imoveis.filter(i => i.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F8EDD9", fontFamily: "'Inter', sans-serif" }}>
      
      <Navbar />

      <main style={{ flex: 1, padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#01103A" }}>Meus Imóveis</h1>
              <p style={{ margin: "4px 0 0 0", color: "#919FAB", fontSize: "15px", fontWeight: "500" }}>Gerencie seus anúncios</p>
            </div>
            <button onClick={abrirModalNovo} style={btnPrimaryStyle}>
              + Novo Anúncio
            </button>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            {imoveis.map((imovel) => (
              <div key={imovel.id} style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", border: `1px solid #919FAB`, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 12px rgba(1, 16, 58, 0.04)" }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#01103A", fontSize: "18px" }}>{imovel.descricao}</h3>
                  <p style={{ margin: "0 0 4px 0", color: "#919FAB", fontSize: "14px" }}>
                    📍 {imovel.localizacao} | {imovel.tipoNegocio}
                  </p>
                  <p style={{ margin: 0, color: "#01103A", fontWeight: "700" }}>
                    {Number(imovel.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => abrirModalEditar(imovel)} style={btnLightStyle}>Editar</button>
                  <button onClick={() => handleExcluir(imovel.id)} style={btnDangerStyle}>Excluir</button>
                </div>
              </div>
            ))}
            {imoveis.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: "#919FAB" }}>
                Nenhum imóvel cadastrado no seu portfólio.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* MODAL NUVEM */}
      {modalAberto && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(1, 16, 58, 0.6)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          
          <div style={{ background: "#F8EDD9", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", borderRadius: "16px", padding: "32px", border: `2px solid #B19F92`, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 24px 0", color: "#01103A", fontSize: "24px" }}>
              {modalAberto === "novo" ? "Criar Novo Anúncio" : "Editar Imóvel"}
            </h2>
            
            <form onSubmit={handleSalvar} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div>
                <label style={labelStyle}>Título do Anúncio (Descrição)</label>
                <input type="text" placeholder="Ex: Apartamento 3 quartos no Centro..." value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})} style={inputStyle} required />
              </div>

              <div>
                <label style={labelStyle}>Localização</label>
                <input type="text" placeholder="Bairro, Rua..." value={formData.localizacao} onChange={(e) => setFormData({...formData, localizacao: e.target.value})} style={inputStyle} required />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Valor (R$)</label>
                  <input type="number" value={formData.valor || ""} onChange={(e) => setFormData({...formData, valor: Number(e.target.value)})} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tipo de Negócio</label>
                  <select value={formData.tipoNegocio} onChange={(e) => setFormData({...formData, tipoNegocio: e.target.value})} style={inputStyle}>
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Quartos</label>
                  <input type="number" value={formData.quartos || ""} onChange={(e) => setFormData({...formData, quartos: Number(e.target.value)})} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Banheiros</label>
                  <input type="number" value={formData.banheiros || ""} onChange={(e) => setFormData({...formData, banheiros: Number(e.target.value)})} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Vagas</label>
                  <input type="number" value={formData.vagas || ""} onChange={(e) => setFormData({...formData, vagas: Number(e.target.value)})} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button type="submit" style={btnPrimaryStyle}>
                  {modalAberto === "novo" ? "Publicar Anúncio" : "Salvar Alterações"}
                </button>
                <button type="button" onClick={fecharModal} style={btnCancelStyle}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const btnPrimaryStyle = { padding: "12px 24px", background: "#01103A", color: "#F8EDD9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "15px" };
const btnLightStyle = { padding: "10px 16px", background: "#B19F92", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const btnDangerStyle = { padding: "10px 16px", background: "transparent", color: "#01103A", border: `1px solid #01103A`, borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const btnCancelStyle = { padding: "12px 24px", background: "transparent", color: "#01103A", border: `2px solid #919FAB`, borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "15px" };
const labelStyle = { display: "block", marginBottom: "6px", fontSize: "14px", color: "#01103A", fontWeight: "600" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid #919FAB`, background: "#ffffff", fontSize: "15px", outline: "none", boxSizing: "border-box" as const, color: "#01103A" };