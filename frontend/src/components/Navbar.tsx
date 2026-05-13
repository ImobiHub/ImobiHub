import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // O React vai olhar no navegador se tem alguém logado
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // Função para deslogar (rasgar o crachá)
  const fazerLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <nav style={{ background: "#333", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      
      {/* Logo */}
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.6rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
        🏢 ImobiHub
      </Link>

      {/* Menus Dinâmicos */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {!usuario ? (
          /* ==================================
             VISUAL PARA QUEM NÃO ESTÁ LOGADO
             ================================== */
          <>
            <Link to="/login" style={{ color: "#ddd", textDecoration: "none", fontWeight: "bold", transition: "0.2s" }}>
              Entrar
            </Link>
            <Link to="/cadastro" style={{ background: "#f4b400", padding: "10px 20px", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
              Cadastre-se
            </Link>
          </>
        ) : (
          /* ==================================
             VISUAL PARA QUEM ESTÁ LOGADO
             ================================== */
          <>
            <span style={{ color: "#ddd", fontSize: "1rem" }}>
              Olá, <strong style={{ color: "#fff" }}>{usuario.nome}</strong>
            </span>
            
            {/* O SEGREDO DO RBAC: Só mostra se for corretor ou admin */}
            {usuario.perfil === "corretor" && (
                <button 
                    onClick={() => navigate("/painel-corretor")} // Verifique se o caminho é o mesmo da rota acima
                        style={{ /* seus estilos */ }}
                        >
                        🏠 Meus Imóveis
                        </button>
)                   }
{usuario.perfil === "admin" && (
  <button 
    onClick={() => navigate("/admin")}
    style={{ background: "#2196f3", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
  >
    📊 Dashboard Admin
  </button>
)}

            {/* Botão de Sair para todo mundo */}
            <button 
              onClick={fazerLogout}
              style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}