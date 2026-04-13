import { useState } from "react";

export default function Filtros({
  buscaCidade,
  setBuscaCidade,
  precoMax,
  setPrecoMax
}: any) {

  const [tipo, setTipo] = useState("");
  const [quartos, setQuartos] = useState("");

  const estiloInput = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "150px"
  };

  return (
    <div style={{
      background: "#fff",
      padding: 20,
      margin: 20,
      borderRadius: 10,
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>

      {/* Tipo de negociação */}
      <select style={estiloInput}>
        <option>Comprar</option>
        <option>Alugar</option>
      </select>

      {/* Tipo de imóvel */}
      <select
        style={estiloInput}
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="">Tipo</option>
        <option value="Casa">Casa</option>
        <option value="Apartamento">Apartamento</option>
      </select>

      {/* Cidade */}
      <input
        placeholder="Cidade"
        value={buscaCidade}
        onChange={(e) => setBuscaCidade(e.target.value)}
        style={estiloInput}
      />

      {/* Preço */}
      <input
        placeholder="Preço máximo"
        value={precoMax}
        onChange={(e) => setPrecoMax(e.target.value)}
        style={estiloInput}
      />

      {/* Quartos */}
      <select
        style={estiloInput}
        value={quartos}
        onChange={(e) => setQuartos(e.target.value)}
      >
        <option value="">Quartos</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
      </select>

      {/* Botão */}
      <button style={{
        background: "#f4b400",
        border: "none",
        padding: "10px 20px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: "bold"
      }}>
        Buscar
      </button>

    </div>
  );
}