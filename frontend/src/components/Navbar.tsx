import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // O React vai olhar no navegador se tem alguém logado
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // Função para deslogar 
  const fazerLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <nav style={{ 
      background: "#01103A", 
      padding: "16px 40px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      color: "#F8EDD9", 
      boxShadow: "0 2px 10px rgba(1, 16, 58, 0.05)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Logo */}
      <Link to="/" style={{ color: "#F8EDD9", textDecoration: "none", fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.5px" }}>
        Imobi<span style={{ color: "#B19F92", fontWeight: "300" }}>Hub</span>
      </Link>

      {/* Menus Dinâmicos */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        
        {!usuario ? (
          /* ==================================
             VISUAL PARA QUEM NÃO ESTÁ LOGADO
             ================================== */
          <>
            <Link to="/login" style={{ color: "#F8EDD9", textDecoration: "none", fontWeight: "500", fontSize: "0.95rem" }}>
              Entrar
            </Link>
            <Link to="/cadastro" style={{ background: "#B19F92", padding: "10px 20px", borderRadius: "6px", color: "#01103A", textDecoration: "none", fontWeight: "600", fontSize: "0.95rem" }}>
              Cadastre-se
            </Link>
          </>
        ) : (
          /* ==================================
             VISUAL PARA QUEM ESTÁ LOGADO
             ================================== */
          <>
            <span style={{ color: "#919FAB", fontSize: "0.95rem" }}>
              Olá, <span style={{ color: "#F8EDD9", fontWeight: "600" }}>{usuario.nome}</span>
            </span>
            
            {}
            {usuario.perfil === "corretor" && (
              <button 
                onClick={() => navigate("/painel-corretor")}
                style={btnMenuMinimal}
              >
                Meus Imóveis
              </button>
            )}
            
            {usuario.perfil === "admin" && (
              <button 
                onClick={() => navigate("/admin")}
                style={btnMenuMinimal}
              >
                Painel Admin
              </button>
            )}

            {}
            <button 
              onClick={fazerLogout}
              style={{ ...btnMenuMinimal, borderColor: "#B19F92", color: "#B19F92" }}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const btnMenuMinimal = {
  background: "transparent", 
  color: "#F8EDD9", 
  border: "1px solid #919FAB", 
  padding: "8px 16px", 
  borderRadius: "6px", 
  cursor: "pointer", 
  fontWeight: "500", 
  fontSize: "0.9rem",
  transition: "all 0.2s"
};