export default function Filtros({
  buscaCidade, setBuscaCidade,
  precoMax, setPrecoMax,
  tipo, setTipo,
  quartos, setQuartos, // Incluído aqui
  onFiltrar
}: any) {
  const estiloInput = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "140px"
  };

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <select style={estiloInput} value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Todos os Tipos</option>
        <option value="Casa">Casa</option>
        <option value="Apartamento">Apartamento</option>
      </select>

      <input
        placeholder="Cidade"
        value={buscaCidade}
        onChange={(e) => setBuscaCidade(e.target.value)}
        style={estiloInput}
      />

      <input
        placeholder="Preço máximo"
        value={precoMax}
        onChange={(e) => setPrecoMax(e.target.value)}
        style={estiloInput}
      />

      {/* Campo de Quartos de volta */}
      <select style={estiloInput} value={quartos} onChange={(e) => setQuartos(e.target.value)}>
        <option value="">Quartos (Mínimo)</option>
        <option value="1">1+ Quarto</option>
        <option value="2">2+ Quartos</option>
        <option value="3">3+ Quartos</option>
      </select>

      <button 
        onClick={onFiltrar}
        style={{
          padding: "10px 20px",
          background: "#f4b400",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Filtrar
      </button>
    </div>
  );
}