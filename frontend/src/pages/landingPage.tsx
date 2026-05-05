import { useState } from "react";
import Navbar from "../components/Navbar";
import Filtros from "../components/filtros";
import CardImovel from "../components/cardImovel";
import Footer from "../components/Footer";

export default function LandingPage() {

  const imoveis = [
    { id: 1, titulo: "Casa em Joinville", preco: 352900, cidade: "Joinville" },
    { id: 2, titulo: "Apartamento Centro", preco: 278500, cidade: "Joinville" },
    { id: 3, titulo: "Sobrado Geminado", preco: 419990, cidade: "Joinville" },
    { id: 4, titulo: "Casa com Piscina", preco: 602300, cidade: "Joinville" },
    { id: 5, titulo: "Apartamento Moderno", preco: 312750, cidade: "Joinville" },
    { id: 6, titulo: "Casa no Bairro América", preco: 489900, cidade: "Joinville" },
    { id: 7, titulo: "Apartamento Mobiliado", preco: 355800, cidade: "Joinville" },
    { id: 8, titulo: "Cobertura Duplex", preco: 890000, cidade: "Joinville" },
    { id: 9, titulo: "Casa Geminada", preco: 265400, cidade: "Joinville" },
    { id: 10, titulo: "Apartamento Compacto", preco: 198990, cidade: "Joinville" },
    { id: 11, titulo: "Casa Alto Padrão", preco: 1250000, cidade: "Joinville" },
    { id: 12, titulo: "Apartamento Vista Mar", preco: 720500, cidade: "Joinville" },
    { id: 13, titulo: "Sobrado Novo", preco: 530000, cidade: "Joinville" },
    { id: 14, titulo: "Casa com Jardim", preco: 410200, cidade: "Joinville" },
    { id: 15, titulo: "Apartamento Econômico", preco: 175000, cidade: "Joinville" },
  ];

  //  ESTADO DO FILTRO
  const [buscaCidade, setBuscaCidade] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  //  FILTRO FUNCIONANDO
  const imoveisFiltrados = imoveis.filter((imovel) => {
    const matchCidade = imovel.cidade
      .toLowerCase()
      .includes(buscaCidade.toLowerCase());

    const matchPreco = precoMax
      ? imovel.preco <= Number(precoMax)
      : true;

    return matchCidade && matchPreco;
  });

  return (
    <div>
      <Navbar />

      <Filtros
        buscaCidade={buscaCidade}
        setBuscaCidade={setBuscaCidade}
        precoMax={precoMax}
        setPrecoMax={setPrecoMax}
      />

      <div className="container">
        <h2>Imóveis disponíveis</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20
        }}>
          {imoveisFiltrados.map((imovel) => (
            <CardImovel key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}