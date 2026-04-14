import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filtros from "../components/Filtros";
import CardImovel from "../components/CardImovel";
import Footer from "../components/Footer";

type Imovel = {
  id: number;
  titulo: string;
  preco: number;
  cidade: string;
  imagem?: string;
};

export default function LandingPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  const [buscaCidade, setBuscaCidade] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  useEffect(() => {
    fetch("http://localhost:5079/api/imoveis/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na resposta da API");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API:", data);

        if (!Array.isArray(data)) {
          console.error("Resposta não é array:", data);
          setLoading(false);
          return;
        }

        const formatado = data.map((item: any) => {
          const cidadeExtraida =
            item.localizacao?.split("-").pop()?.trim() || "";

          return {
            id: item.id,
            titulo: item.descricao,
            preco: item.valor,
            cidade: cidadeExtraida,
            imagem:
              typeof item.imagem === "string"
                ? item.imagem
                : undefined,
          };
        });

        console.log("Formatado:", formatado);

        setImoveis(formatado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar imóveis:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 FILTRO
  const imoveisFiltrados = imoveis.filter((imovel) => {
    const cidade = imovel.cidade || "";

    const matchCidade = cidade
      .toLowerCase()
      .includes(buscaCidade.toLowerCase());

    const matchPreco = precoMax
      ? imovel.preco <= Number(precoMax)
      : true;

    return matchCidade && matchPreco;
  });

  console.log("Filtrados:", imoveisFiltrados);

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

        {/* 🔹 LOADING */}
        {loading && <p>Carregando imóveis...</p>}

        {/* 🔹 SEM RESULTADO */}
        {!loading && imoveisFiltrados.length === 0 && (
          <p>Nenhum imóvel encontrado.</p>
        )}

        {/* 🔹 GRID */}
        {!loading && imoveisFiltrados.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            {imoveisFiltrados.map((imovel) => (
              <CardImovel key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}