import "../styles/principal.css";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { Context } from "../resources/context";
import { useEffect, useState, useContext } from "react";

import IconPessoa from "../assets/icon-person.png";
import io from "socket.io-client";
import { criarPost } from "../resources/api";
const chatAddrs = "http://localhost:5000";
const lorem =
  "enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra bibendum arcu vitae";

function Principal({ props }) {
  const context = useContext(Context);
  const [listaPessoas, setListaPessoas] = useState([]);
  const [textareaMsg, setTextareaMsg] = useState("");
  const [msgArray, setMsgArray] = useState([]);
  const [displayMsg, setDisplayMsg] = useState();
  const [postArray, setPostArray] = useState([]);
  const [displayPost, setDisplayPost] = useState();
  let sala = "Mobile";
  const [textareaPost, setTextareaPost] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(0);

  function enviarMensagem() {
    console.log("Enviando mensagem...");
    // console.log(textareaMsg);
    if (textareaMsg.length > 0) {
      let divMensagem = (
        <div className="container-mensagem-enviada">
          <p className="text-mensagem-enviada">{textareaMsg}</p>
        </div>
      );
      let auxArray = msgArray;
      auxArray.push(divMensagem);
      setMsgArray(auxArray);
      updateDisplayMsg();
    }
  }

  async function realizarPost() {
    if (textareaPost.length > 0) {
      console.log("Realizando post...");
      let text = textareaPost;
      setTextareaPost("");
      let post = {
        userId: context.userId,
        desc: text,
      };

      console.log("Post: " + JSON.stringify(post));
      const resp = await criarPost(post);
      console.log("->Resposta do post:");
      console.log(JSON.stringify(resp));

      if (resp.status === 200) {
        let divPost = (
          <div className="card-post">
            <div className="card-post-left-img">
              <img className="icon-post" src={IconPessoa} alt="Minha Figura" />
            </div>
            <div className="card-post-right-content">
              <div className="card-post-header">
                <h3 className="card-username">Caio Souza</h3>
              </div>
              <div className="card-post-content">
                <p className="text-post-content">{text}</p>
              </div>
            </div>
          </div>
        );
        let auxArray = postArray;
        auxArray.unshift(divPost);
        setPostArray(auxArray);
        updadeDisplayPosts();
      } else {
        alert("Erro ao realizar post!");
      }
    } else {
      alert("Por favor, escreva algo antes de enviar!");
    }
  }

  function updateDisplayMsg() {
    let disp = <div>{msgArray}</div>;
    setDisplayMsg(disp);
  }

  function updadeDisplayPosts() {
    let disp = <div>{postArray}</div>;
    setDisplayPost(disp);
  }

  function carregarPosts() {
    let post1 = (
      <div className="card-post">
        <div className="card-post-left-img">
          <img className="icon-post" src={IconPessoa} alt="Minha Figura" />
        </div>
        <div className="card-post-right-content">
          <div className="card-post-header">
            <h3 className="card-username">Caio Souza</h3>
          </div>
          <div className="card-post-content">
            <p className="text-post-content">{lorem}</p>
          </div>
        </div>
      </div>
    );
    let post2 = (
      <div className="card-post">
        <div className="card-post-left-img">
          <img className="icon-post" src={IconPessoa} alt="Minha Figura" />
        </div>
        <div className="card-post-right-content">
          <div className="card-post-header">
            <h3 className="card-username">Luis Soares</h3>
          </div>
          <div className="card-post-content">
            <p className="text-post-content">Bom dia a todos!</p>
          </div>
        </div>
      </div>
    );
    let arrayPosts = [post1, post2];
    setPostArray(arrayPosts);
  }

  function carregarMensagens() {
    let mensagem1 = (
      <div className="container-mensagem-enviada">
        <p className="text-mensagem-enviada">Olá, tudo bem?</p>
      </div>
    );
    let mensagen2 = (
      <div className="container-mensagem-recebida">
        <p className="text-mensagem-recebida">Tudo e com você?</p>
      </div>
    );

    let mensagen3 = (
      <div className="container-mensagem-recebida">
        <p className="text-mensagem-recebida">
          Já começou o projeto do cliente novo?
        </p>
      </div>
    );

    let auxArray = [mensagem1, mensagen2, mensagen3];
    setMsgArray(auxArray);
  }

  useEffect(() => {
    let newSize = 140 - textareaPost.length;
    setCharactersLeft(newSize);
  }, [textareaPost]);

  useEffect(() => {
    setListaPessoas([]);
    setCharactersLeft(140);
    carregarMensagens();
    carregarPosts();

    let listaAux = [
      { nome: "Caio Silva" },
      { nome: "Luis Soares" },
      { nome: "Time Dev Mobile" },
      { nome: "Time Dev Web" },
    ];

    setListaPessoas(listaAux);
  }, [props]);

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
            <div>{displayMsg}</div>
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
                onClick={() => {
                  realizarPost();
                }}
              >
                Postar
              </button>
              {charactersLeft > 10 ? (
                <p className="characters-left">{charactersLeft}</p>
              ) : (
                <p className="characters-left-ending">{charactersLeft}</p>
              )}
            </div>
          </div>
          <div className="container-card-post">{displayPost}</div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
