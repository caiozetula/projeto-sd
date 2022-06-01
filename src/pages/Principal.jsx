import "../styles/principal.css";
import "../styles/main.css";
import { Link } from "react-router-dom";

import IconPessoa from "../assets/icon-person.png";
import { useEffect, useState } from "react";

function Principal() {

  const [listaPessoas, setListaPessoas] = useState([]);

  useEffect(() => {
    setListaPessoas([]);
    let listaAux = [{ nome: "Caio Zetula" }, { nome: "Luis Soares" }, { nome: "Fernando" }];
    setListaPessoas(listaAux);
  }, [])

  return (
    <div className="container-principal">
      <div className="menu">
        <p className="titulo-site">WorkSpace</p>
        <Link to="/" className="menu-item">
          Sair
        </Link>
      </div>
      <div className="containers">
        {/* TELA PESSOAS */}
        <div className="container-geral container-pessoas">
          <div className="titulo-container">
            <h2 className="texto-titulo-container">Pessoas & Grupos</h2>
            <div className="container-lista-pessoas">
              {listaPessoas.length > 0 ?
                listaPessoas.map(pessoa => {
                  return (
                    <div className="item-lista-pessoas">
                      <img className="icon-pessoa" src={IconPessoa} alt="Minha Figura" />
                      <h3 className="texto-nome-pessoa">{pessoa.nome}</h3>
                    </div>
                  );
                })
                :
                <h3 className="texto-vazio">Lista Vazia</h3>
              }
            </div>
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
