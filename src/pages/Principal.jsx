import "../styles/principal.css";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { Context } from "../resources/context";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import {
  criarPost,
  getUsuario,
  seguirUsuario,
  getPostsTimeline,
} from "../resources/api";

import IconPessoa from "../assets/icon-person.png";
import IconSearch from "../assets/icon-search.png";
import IconAdd from "../assets/icon-add.png";
import { Modal, Box } from "@mui/material";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function Principal({ props }) {
  const context = useContext(Context);
  const [listaPessoas, setListaPessoas] = useState([]);
  const [textareaMsg, setTextareaMsg] = useState("");
  const [msgArray, setMsgArray] = useState([]);
  const [displayMsg, setDisplayMsg] = useState(null);
  const [postArray, setPostArray] = useState([]);
  const [displayPost, setDisplayPost] = useState(null);
  const [textareaPost, setTextareaPost] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalSearchUser, setShowModalSearchUser] = useState(false);
  const [modalSearchTxt, setModalSearchTxt] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalAddTxt, setModalAddTxt] = useState("");
  const [respPesquisa, setRespPesquisa] = useState({ name: "", email: "" });

  let sala = "JavaScript";

  async function carregarDadosSalvos() {
    context.setNome(localStorage.getItem("nomeUsuario"));
    context.setEmail(localStorage.getItem("email"));
  }

  async function seguir() {
    let body = {
      isAdmin: true,
      email: respPesquisa.email,
    };

    const resp = await seguirUsuario(context.email, body);
    console.log(resp);
    if (resp.status !== 200) {
      alert(resp.msg);
    } else {
      alert(resp.msg);
      setShowModalSearchUser(false);
      setModalSearchTxt("");
      setRespPesquisa({ name: "", email: "" });
    }
  }

  async function pesquisarUsuario() {
    const resp = await getUsuario(modalSearchTxt);
    console.log(resp);
    if (resp.status !== 200) {
      alert("Usuário não encontrado!");
    } else {
      setRespPesquisa({
        name: resp.msg.user.username,
        email: resp.msg.user.email,
      });
      setShowModalSearchUser(true);
    }
  }

  function enviarMensagem() {
    console.log("Enviando mensagem...");
    // console.log(textareaMsg);
    if (textareaMsg.length > 0) {
      socket.emit("chatMessage", textareaMsg);
    }
  }

  async function abrirSocket() {
    let email = context.email;
    console.log("Email: " + email);
    console.log("Sala: " + sala);
    socket.emit("joinRoom", { username: email, room: sala });
    socket.on("roomUsers", ({ room, users }) => {
      console.log(room);
      console.log(users);
    });

    socket.on("message", (message) => {
      console.log(message);
      if (message.username === context.email) {
        let divMensagem = (
          <div className="container-mensagem-enviada">
            <p className="text-mensagem-enviada">{message.text}</p>
          </div>
        );
        let auxArray = msgArray;
        auxArray.push(divMensagem);
        setMsgArray(auxArray);
        updateDisplayMsg();
      } else {
        let divMensagem = (
          <div className="container-mensagem-recebida">
            <p className="user-mensagem-recebida">{message.username}</p>
            <p className="text-mensagem-recebida">{message.text}</p>
          </div>
        );
        let auxArray = msgArray;
        auxArray.push(divMensagem);
        setMsgArray(auxArray);
        updateDisplayMsg();
      }
    });
  }

  async function realizarPost() {
    if (textareaPost.length > 0) {
      console.log("Realizando post...");
      let text = textareaPost;
      setTextareaPost("");
      let post = {
        userId: context.email,
        desc: text,
        isAdmin: true,
      };

      console.log("Post: " + JSON.stringify(post));
      const resp = await criarPost(post);
      console.log("->Resposta do post:");
      console.log(JSON.stringify(resp));

      if (resp.status === 200) {
        await carregarPosts();
      } else {
        alert("Erro ao realizar post!");
      }
    } else {
      alert("Por favor, escreva algo antes de enviar!");
    }
  }

  function entrarSala() {
    if (modalSearchTxt.length === 0) {
      alert("Insira o nome da sala!");
      return;
    } else {
      console.log("Entrando na sala: " + modalSearchTxt);
      setShowModalSearch(false);
      setModalSearchTxt("");
    }
  }

  function criarSala() {
    if (modalAddTxt.length === 0) {
      alert("Insira o nome da sala!");
      return;
    } else {
      console.log("Entrando na sala: " + modalAddTxt);
      setShowModalAdd(false);
      setModalAddTxt("");
    }
  }

  function updateDisplayMsg() {
    let disp = <div>{msgArray}</div>;
    setDisplayMsg(disp);
  }

  function updateDisplayPosts() {
    let disp = <div>{postArray}</div>;
    setDisplayPost(disp);
  }

  async function carregarPosts() {
    const resp = await getPostsTimeline(context.email);
    console.log("USUARIO: " + context.email);

    if (resp.status !== 200) {
      alert("Erro ao carregar posts!");
    } else {
      let auxArray = resp.msg.reverse();
      var arrayPosts = [];
      auxArray.forEach((post) => {
        let divPost = (
          <div className="card-post">
            <div className="card-post-left-img">
              <img className="icon-post" src={IconPessoa} alt="Minha Figura" />
            </div>
            <div className="card-post-right-content">
              <div className="card-post-header">
                <h3 className="card-username">{post.userId}</h3>
              </div>
              <div className="card-post-content">
                <p className="text-post-content">{post.desc}</p>
              </div>
            </div>
          </div>
        );
        arrayPosts.push(divPost);
      });
    }
    setPostArray(arrayPosts);
    //updateDisplayPosts();
  }

  useEffect(() => {
    updateDisplayPosts();
  }, [postArray])

  useEffect(() => {
    let newSize = 140 - textareaPost.length;
    setCharactersLeft(newSize);
  }, [textareaPost]);

  useEffect(() => {
    if(context.email == null) return;

    carregarPosts();

    let listaAux = [
      { nome: "Time Dev Web" },
      { nome: "Time Dev Mobile" },
      { nome: "Backend" },
      { nome: "Squad Sonserina" },
    ];

    setShowModalSearch(false);
    setShowModalAdd(false);
    setShowModalSearchUser(false);
    setListaPessoas(listaAux);
    abrirSocket();
  }, [context.email]);

  useEffect(() => {
    setCharactersLeft(140);
    carregarDadosSalvos();
  }, []);

  return (
    <div className="container-principal">
      <Modal open={showModalSearch} onClose={() => setShowModalSearch(false)}>
        <Box className="box-modal">
          <div className="modal-title">
            <h3 className="modal-title-text">Entrar em uma sala...</h3>
          </div>
          <div className="modal-input">
            <input
              className="modal-input-text"
              type="text"
              placeholder="Nome da sala"
              value={modalSearchTxt}
              onChange={(e) => {
                setModalSearchTxt(e.target.value);
              }}
            ></input>
            <button
              className="modal-input-button"
              onClick={() => {
                entrarSala();
              }}
            >
              Entrar
            </button>
          </div>
        </Box>
      </Modal>
      <Modal open={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <Box className="box-modal">
          <div className="modal-title">
            <h3 className="modal-title-text">Criar uma sala...</h3>
          </div>
          <div className="modal-input">
            <input
              className="modal-input-text"
              type="text"
              placeholder="Nome da sala"
              value={modalAddTxt}
              onChange={(e) => {
                setModalAddTxt(e.target.value);
              }}
            ></input>
            <button
              className="modal-input-button"
              onClick={() => {
                criarSala();
              }}
            >
              Criar
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={showModalSearchUser}
        onClose={() => setShowModalSearchUser(false)}
      >
        <Box className="box-modal">
          <div className="modal-title">
            <h3 className="modal-title-text">Pesquisa de usuário</h3>
          </div>
          <div className="modal-input">
            <input
              className="modal-input-text"
              type="text"
              value={respPesquisa.name}
              contentEditable={false}
            ></input>
            <button
              className="modal-input-button"
              onClick={() => {
                seguir();
              }}
            >
              Seguir
            </button>
          </div>
        </Box>
      </Modal>
      <div className="menu">
        <p className="titulo-site">WorkSpace</p>
        <input
          className="searchbar-input-text"
          type="text"
          placeholder="Digite o e-mail para pesquisar"
          value={modalSearchTxt}
          onChange={(e) => {
            setModalSearchTxt(e.target.value);
          }}
        ></input>
        <button
          className="searchbar-input-button"
          onClick={() => {
            pesquisarUsuario();
          }}
        >
          <img
            className="icons-search-add"
            src={IconSearch}
            alt="Ícone pesquisar"
          ></img>
        </button>
        <div className="header-content">
          <Link to="/" className="menu-button-sair">
            Sair
          </Link>
          <p className="user-name-header">{context.nome}</p>
          <img
            className="avatar-user-header"
            src={IconPessoa}
            alt="Avatar do usuário"
          ></img>
        </div>
      </div>
      <div className="containers">
        {/* TELA PESSOAS */}
        <div className="container-geral container-pessoas">
          <div className="titulo-container">
            <h2 className="texto-titulo-container">Salas</h2>
            <div style={{ display: "inline-block", width: "100%" }}>
              <div className="container-search-room">
                <button
                  className="button-search-add button-search"
                  onClick={() => setShowModalSearch(true)}
                >
                  <img
                    className="icons-search-add"
                    src={IconSearch}
                    alt="Ícone pesquisar"
                  ></img>
                </button>
                <button
                  className="button-search-add button-add"
                  onClick={() => setShowModalAdd(true)}
                >
                  <img
                    className="icons-search-add"
                    src={IconAdd}
                    alt="Ícone adicionar"
                  ></img>
                </button>
              </div>
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
