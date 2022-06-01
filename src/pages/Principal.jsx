import "../styles/principal.css";
import "../styles/main.css";
import { Link } from "react-router-dom";

function Principal() {
  return (
    <div className="container-principal">
      <div className="menu">
        <p className="titulo-site">WorkSpace</p>
        <Link to="/" className="menu-item">
          Sair
        </Link>
      </div>
      <div className="containers">
        <div className="container-geral container-pessoas">
          <div className="titulo-container">
              <h2 className="texto-titulo-container">Pessoas</h2>
          </div>
        </div>
        <div className="container-geral container-chat">
        <div className="titulo-container">
              <h2 className="texto-titulo-container">Chat</h2>
          </div>
        </div>
        <div className="container-geral container-posts">
        <div className="titulo-container">
              <h2 className="texto-titulo-container">Posts</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
