export default function Filtros({
  buscaCidade, setBuscaCidade,
  precoMax, setPrecoMax,
  tipo, setTipo,
  tipoNegocio, setTipoNegocio,
  quartos, setQuartos,
  vagas, setVagas,
  banheiros, setBanheiros,
  onFiltrar,
  onLimpar // NOVO: Função para limpar os filtros
}: any) {
  const estiloInput = {
    padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "140px"
  };

  return (
    <div style={{
      background: "#fff", padding: "20px", margin: "20px", borderRadius: "10px",
      display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <select style={estiloInput} value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Tipo de Imóvel</option>
        <option value="Casa">Casa / Sobrado / Geminado</option>
        <option value="Apartamento">Apartamento / Studio</option>
        <option value="Terreno">Terreno / Lote</option>
      </select>

      <select style={estiloInput} value={tipoNegocio} onChange={(e) => setTipoNegocio(e.target.value)}>
        <option value="">Comprar ou Alugar?</option>
        <option value="Venda">Comprar (Venda)</option>
        <option value="Aluguel">Alugar</option>
      </select>

      <input placeholder="Cidade ou Bairro" value={buscaCidade} onChange={(e) => setBuscaCidade(e.target.value)} style={estiloInput} />
      <input placeholder="Preço máximo" value={precoMax} onChange={(e) => setPrecoMax(e.target.value)} style={estiloInput} />

      <select style={estiloInput} value={quartos} onChange={(e) => setQuartos(e.target.value)}>
        <option value="">Quartos</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>

      <select style={estiloInput} value={vagas} onChange={(e) => setVagas(e.target.value)}>
        <option value="">Vagas</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
      </select>

      <select style={estiloInput} value={banheiros} onChange={(e) => setBanheiros(e.target.value)}>
        <option value="">Banheiros</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
      </select>

      {/* BOTÃO DE FILTRAR */}
      <button onClick={onFiltrar} style={{ padding: "10px 20px", background: "#f4b400", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Filtrar
      </button>

      {/* NOVO: BOTÃO DE LIMPAR */}
      <button onClick={onLimpar} style={{ padding: "10px 20px", background: "#ccc", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Limpar
      </button>
    </div>
  );
}