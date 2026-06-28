import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

export default function FormularioImovel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    descricao: "", localizacao: "", valor: "", tipoNegocio: "Venda" 
  });

  useEffect(() => {
    if (id) {
      // Carrega dados se for Edição
      api.get("/imoveis").then(res => {
        const item = res.data.find((i: any) => i.id == id);
        if (item) setFormData(item);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
    const payload = { ...formData, fk_corretor: usuario.id };

    if (id) {
      await api.put(`/imoveis/${id}`, payload); // Rota de Update
    } else {
      await api.post("/imoveis", payload); // Rota de Insert
    }
    navigate("/painel-corretor");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#fff" }}>
      <h1>{id ? "Editar Imóvel" : "Novo Anúncio"}</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} style={{width: "100%", padding: "10px", margin: "10px 0"}} />
        <input placeholder="Localização" value={formData.localizacao} onChange={e => setFormData({...formData, localizacao: e.target.value})} style={{width: "100%", padding: "10px", margin: "10px 0"}} />
        <input type="number" placeholder="Valor" value={formData.valor} onChange={e => setFormData({...formData, valor: e.target.value})} style={{width: "100%", padding: "10px", margin: "10px 0"}} />
        <button type="submit" style={{width: "100%", padding: "15px", background: "#f4b400", border: "none"}}>Salvar</button>
      </form>
    </div>
  );
}