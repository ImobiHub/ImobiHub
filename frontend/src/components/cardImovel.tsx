import { useNavigate } from "react-router-dom";

export default function CardImovel({ imovel }: { imovel: any }) {
  const navigate = useNavigate();

  // Se o imovel for nulo, nao renderiza nada para evitar crash
  if (!imovel) return null;

  // BLINDAGEM DO VALOR: 
  // Tentamos converter para numero, se falhar ou nao existir, usamos 0.
  const valorExibicao = imovel.valor !== undefined && imovel.valor !== null
    ? Number(imovel.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : "Sob consulta";

  // FALLBACK DE IMAGEM: 
  // Se nao tiver imagem ou se for o erro do System.Byte, usamos uma foto padrão.
  const imagemValida = imovel.imagem && imovel.imagem !== "System.Byte[]" && imovel.imagem !== ""
    ? imovel.imagem 
    : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600";

  return (
    <div 
      onClick={() => navigate(`/imovel/${imovel.id}`)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* IMAGEM E TAG */}
      <div style={{ position: "relative", height: "220px" }}>
        <img 
          src={imagemValida} 
          alt={imovel.descricao} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: imovel.tipoNegocio === "Aluguel" ? "#38a169" : "#2b6cb0",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "99px",
          fontSize: "0.75rem",
          fontWeight: "700",
          textTransform: "uppercase"
        }}>
          {imovel.tipoNegocio || "Destaque"}
        </div>
      </div>

      {/* TEXTOS */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ 
          fontSize: "1.1rem", 
          fontWeight: "700", 
          margin: "0 0 5px 0",
          color: "#1a202c",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {imovel.descricao || "Sem titulo"}
        </h3>
        
        <p style={{ color: "#718096", fontSize: "0.85rem", marginBottom: "15px" }}>
          📍 {imovel.localizacao || "Localizacao nao informada"}
        </p>

        {/* ICONES DE CARACTERISTICAS */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          paddingTop: "15px",
          borderTop: "1px solid #edf2f7",
          marginBottom: "15px"
        }}>
          <span style={{ fontSize: "0.85rem", color: "#4a5568" }}>🛏️ <strong>{imovel.quartos || 0}</strong></span>
          <span style={{ fontSize: "0.85rem", color: "#4a5568" }}>🚗 <strong>{imovel.vagas || 0}</strong></span>
          <span style={{ fontSize: "0.85rem", color: "#4a5568" }}>🚿 <strong>{imovel.banheiros || 0}</strong></span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#2d3748" }}>
            {valorExibicao}
          </span>
          <button style={{ 
            background: "#f7fafc", 
            border: "1px solid #e2e8f0", 
            padding: "8px 16px", 
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: "600",
            color: "#4a5568"
          }}>
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}