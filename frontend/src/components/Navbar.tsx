export default function Navbar() {
  return (
    <div style={{
      background: "#fff",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee"
    }}>
      <h2 style={{ color: "#f4b400" }}>ImobiHub</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <span>Comprar</span>
        <span>Alugar</span>
        <span>Contato</span>
      </div>
    </div>
  );
}