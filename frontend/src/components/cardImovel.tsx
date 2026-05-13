export default function CardImovel({ imovel }: any) {
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
  src={imovel.imagem}
  alt={imovel.titulo}
  style={{ width: "100%", height: "200px", objectFit: "cover" }}
/>

      <div style={{ padding: 15 }}>
        <h4 style={{ marginBottom: "5px" }}>{imovel.titulo}</h4>
        <p style={{ color: "#777", fontSize: "0.9rem" }}>{imovel.cidade}</p>
        <h3 style={{ color: "#f4b400", marginTop: "10px" }}>
          {imovel.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h3>
      </div>
    </div>
  );
}