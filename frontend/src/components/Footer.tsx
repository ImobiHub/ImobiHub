export default function Footer() {
  return (
    <div style={{
      background: "#222",
      color: "#fff",
      padding: 40,
      marginTop: 40
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        <div>
          <h3>ImobiHub</h3>
          <p>Encontre seu imóvel ideal com facilidade.</p>
        </div>

        <div>
          <h4>Institucional</h4>
          <p>Sobre nós</p>
          <p>Trabalhe conosco</p>
          <p>Contato</p>
        </div>

        <div>
          <h4>Ajuda</h4>
          <p>Suporte</p>
          <p>Termos de uso</p>
          <p>Privacidade</p>
        </div>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#444" }} />

      <p style={{ textAlign: "center" }}>
        © 2026 ImobiHub - Projeto acadêmico
      </p>
    </div>
  );
}