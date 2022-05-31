import "../styles/home.css";
import "../styles/main.css";
import { Link } from "react-router-dom";

function Home(){
  return (
    <div className="container-principal">
      <div className="menu">
          <Link to="/login" className="menu-item">Entrar</Link>
          <Link to="/criarConta" className="menu-item">Criar Conta</Link>
      </div>
      <div className="conteudo">
        <h1 className="titulo animate__animated animate__infinite animate__pulse">
          WorkSpace
        </h1>
      </div>
    </div>
  );
}

export default Home;
