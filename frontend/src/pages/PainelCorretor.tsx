import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PainelCorretor() {
  const navigate = useNavigate();
  const [meusImoveis, setMeusImoveis] = useState<any[]>([]);
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  async function carregarImoveis() {
    try {
      const res = await api.get(`/imoveis/corretor/${usuario.id}`);
      setMeusImoveis(res.data);
    } catch (e) { alert("Erro ao carregar"); }
  }

  useEffect(() => { carregarImoveis(); }, []);

  const handleExcluir = async (id: number) => {
    if (window.confirm("Excluir este imóvel?")) {
      try {
        await api.delete(`/imoveis/${id}`);
        setMeusImoveis(meusImoveis.filter(i => i.id !== id));
      } catch { alert("Erro ao excluir"); }
    }
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h1>Meus Imóveis</h1>
          <button onClick={() => navigate("/novo-anuncio")} style={{ padding: "10px 20px", background: "#f4b400", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            + Novo Anúncio
          </button>
        </div>
        <table style={{ width: "100%", background: "#fff", borderRadius: "8px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>Imóvel</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Valor</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {meusImoveis.map((imovel) => (
              <tr key={imovel.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "15px" }}>{imovel.descricao}</td>
                <td style={{ padding: "15px" }}>R$ {Number(imovel.valor).toFixed(2)}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button onClick={() => navigate(`/editar-imovel/${imovel.id}`)} style={{ marginRight: "10px", background: "#2196f3", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => handleExcluir(imovel.id)} style={{ background: "#f44336", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}