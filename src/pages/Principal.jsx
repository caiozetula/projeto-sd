import "../styles/principal.css";
import "../styles/main.css";
import { Link } from "react-router-dom";

import IconPessoa from "../assets/icon-person.png";
import { useEffect, useState } from "react";

function Principal() {
  const [listaPessoas, setListaPessoas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [textareaMsg, setTextareaMsg] = useState("");
  const [textareaPost, setTextareaPost] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(0);

  function enviarMensagem() {
    // console.log("Enviando mensagem...");
    // console.log(textareaMsg);
    if (textareaMsg.length > 0) {
      let divMensagem = (
        <div className="container-mensagem-enviada">
          <p className="text-mensagem-enviada">{textareaMsg}</p>
        </div>
      );
      let novaDiv = (
        <div>
          {mensagens}
          {divMensagem}
        </div>
      );
      setMensagens(novaDiv);
    }
  }

  function carregarMensagens() {
    let mensagensEnviadas = (
      <div className="container-mensagem-enviada">
        <p className="text-mensagem-enviada">E ta tudo bem!</p>
      </div>
    );
    let mensagensRecebidas = (
      <div className="container-mensagem-recebida">
        <p className="text-mensagem-recebida">É sobre isso...</p>
      </div>
    );

    let mensagensArray = (
      <div>
        {mensagensEnviadas}
        {mensagensRecebidas}
      </div>
    );
    setMensagens(mensagensArray);
  }

  useEffect(() => {
    let newSize = 140 - textareaPost.length;
    setCharactersLeft(newSize);
  }, [textareaPost])

  useEffect(() => {
    setListaPessoas([]);
    setCharactersLeft(140);
    carregarMensagens();
    let listaAux = [
      { nome: "Caio Silva" },
      { nome: "Luis Soares" },
      { nome: "Time Dev Mobile" },
      { nome: "Time Dev Web" },
    ];
    setListaPessoas(listaAux);
  }, []);

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
              {listaPessoas.length > 0 ? (
                listaPessoas.map((pessoa) => {
                  return (
                    <div className="item-lista-pessoas">
                      <img
                        className="icon-pessoa"
                        src={IconPessoa}
                        alt="Minha Figura"
                      />
                      <h3 className="texto-nome-pessoa">{pessoa.nome}</h3>
                    </div>
                  );
                })
              ) : (
                <h3 className="texto-vazio">Lista Vazia</h3>
              )}
            </div>
          </div>
        </div>

        {/* TELA CHAT */}
        <div className="container-geral container-chat">
          <div className="titulo-container">
            <h2 className="texto-titulo-container">Chat</h2>
          </div>

          <div className="container-chat-mensagens">
            <div>{mensagens}</div>
          </div>
          <div className="container-chat-texto">
            <textarea
              className="textarea-mensagem"
              placeholder="Mensagem"
              rows={3}
              cols={50}
              value={textareaMsg}
              onChange={(e) => setTextareaMsg(e.target.value)}
            />
            <button
              className="button-enviar"
              onClick={() => {
                enviarMensagem();
              }}
            >
              Enviar
            </button>
          </div>
        </div>

        {/* TELA POSTS */}
        <div className="container-geral container-posts">
          <div className="titulo-container">
            <h2 className="texto-titulo-container">Posts</h2>
          </div>
          <div className="container-textarea-post">
            <textarea
              className="textarea-post"
              placeholder="O que está acontecendo?"
              rows={3}
              cols={50}
              maxLength={140}
              value={textareaPost}
              onChange={(e) => setTextareaPost(e.target.value)}
            />
            <div className="minicontainer-post">
              <button
                className="button-post"
              // onClick={() => {
              //   enviarMensagem();
              // }}
              >
                Postar
              </button>
              {charactersLeft > 10 ?
                <p className="characters-left">{charactersLeft}</p>
                :
                <p className="characters-left-ending">{charactersLeft}</p>
              }
            </div>
          </div>
          <div className="container-card-post">
            <div className="card-post">
              <div className="card-post-left-img">
                <img
                  className="icon-post"
                  src={IconPessoa}
                  alt="Minha Figura"
                />
              </div>
              <div className="card-post-right-content">
                <div className="card-post-header">
                  <h3 className="card-username">Caio Souza</h3>
                </div>
                <div className="card-post-content">
                  <p className="text-post-content">Algum post qualquer sobre algo da vida...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
