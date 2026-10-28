import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme, Tema } from "../../../contexts/ThemeContext";

export default function Header() {
  const { usuario, sair } = useAuth();
  const { tema, alternarTema } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    sair();
    navigate("/login", { replace: true });
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/"><span className="brand__mark">N</span><span>NOVA<span className="brand__light">.STORE</span></span></Link>
      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink to="/" end>Produtos</NavLink>
        {usuario?.role === "admin" && <NavLink to="/produtos/novo">Cadastrar produto</NavLink>}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={alternarTema} aria-label={`Ativar tema ${tema === Tema.Claro ? "escuro" : "claro"}`}>
          {tema === Tema.Claro ? "◐" : "☼"}
        </button>
        {usuario ? (
          <>
            <span className="user-greeting">Olá, {usuario.nome.split(" ")[0]}</span>
            <Button variant="ghost" type="button" onClick={handleLogout}>Sair</Button>
          </>
        ) : <Link className="text-link" to="/login">Entrar</Link>}
      </div>
    </header>
  );
}
