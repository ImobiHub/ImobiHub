interface Imovel {
  id: number;
  titulo: string;
  cidade: string;
  preco: number;
}

interface CardImovelProps {
  imovel: Imovel;
}

export default function CardImovel({ imovel }: CardImovelProps) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "0.2s"
    }}>
      <img
        src={`https://picsum.photos/300/200?random=${imovel.id}`}
        style={{ width: "100%" }}
      />

      <div style={{ padding: 15 }}>
        <h4>{imovel.titulo}</h4>
        <p style={{ color: "#777" }}>{imovel.cidade}</p>
        <h3>R$ {imovel.preco.toLocaleString()}</h3>
      </div>
    </div>
  );
}
