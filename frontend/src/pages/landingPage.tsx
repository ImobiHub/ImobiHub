import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filtros from "../components/Filtros";
import CardImovel from "../components/CardImovel";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function LandingPage() {
  const [imoveisOriginal, setImoveisOriginal] = useState<any[]>([]); // Lista vinda do banco
  const [imoveisExibidos, setImoveisExibidos] = useState<any[]>([]); // Lista após filtro
  const [loading, setLoading] = useState(true);

  const [buscaCidade, setBuscaCidade] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    async function carregarImoveis() {
      try {
        setLoading(true);
        const resposta = await api.get("/imoveis");
        setImoveisOriginal(resposta.data);
        setImoveisExibidos(resposta.data); // Inicialmente mostra tudo
      } catch (erro) {
        console.error("Erro ao carregar imóveis:", erro);
      } finally {
        setLoading(false);
      }
    }
    carregarImoveis();
  }, []);

// Dentro da sua LandingPage, adicione o estado de quartos se ele sumiu:
const [quartos, setQuartos] = useState("");

// Atualize a função lidarComFiltro:
const lidarComFiltro = () => {
  const filtrados = imoveisOriginal.filter((imovel) => {
    // Filtro de Cidade
    const matchCidade = imovel.localizacao.toLowerCase().includes(buscaCidade.toLowerCase());
    
    // Filtro de Preço
    const valorLimpo = precoMax.replace(/\./g, '').replace(',', '.');
    const filtroPreco = parseFloat(valorLimpo);
    const matchPreco = (!filtroPreco || isNaN(filtroPreco)) ? true : imovel.valor <= filtroPreco;

    // Filtro de Tipo
    const matchTipo = tipo ? imovel.descricao.toLowerCase().includes(tipo.toLowerCase()) : true;

    // NOVO: Filtro de Quartos (procura o número no texto da descrição)
    const matchQuartos = quartos 
      ? imovel.descricao.toLowerCase().includes(`${quartos} quarto`) || 
        imovel.descricao.toLowerCase().includes(`${quartos} dorm`)
      : true;

    return matchCidade && matchPreco && matchTipo && matchQuartos;
  });

  setImoveisExibidos(filtrados);
};

  return (
    <div>
      <Navbar />
      <Filtros
        buscaCidade={buscaCidade} setBuscaCidade={setBuscaCidade}
        precoMax={precoMax} setPrecoMax={setPrecoMax}
        tipo={tipo} setTipo={setTipo}
        onFiltrar={lidarComFiltro} // Passa a função para o botão
      />

      <div className="container">
        {loading ? (
          <p>Carregando imóveis...</p>
        ) : (
          <>
            <h2>{imoveisExibidos.length} imóveis encontrados</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {imoveisExibidos.map((imovel) => (
                <CardImovel 
                  key={imovel.id} 
                  imovel={{
                    id: imovel.id,
                    titulo: imovel.descricao,
                    cidade: imovel.localizacao,
                    preco: imovel.valor,
                    imagem: (imovel.imagem && imovel.imagem !== "NULL") 
                      ? imovel.imagem 
                      : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"
                  }} 
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}