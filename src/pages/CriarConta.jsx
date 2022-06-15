import "../styles/criarConta.css";
import "../styles/main.css";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { criarConta } from "../resources/api";
import { useNavigate } from "react-router-dom";

import IconAvatar from "../assets/default-avatar.jpg";
import IconPhoto from "../assets/photo-icon.png";

function CriarConta() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const inputFile = useRef(null);
  let navigation = useNavigate();

  function abrirCaixaDialogo(){
    inputFile.current.click();
  }

  function carregarFoto(e){
    if(!e.target.files || e.target.files.length === 0) return;
    setPhoto(e.target.files[0]);
  }

  async function cadastrar() {
    const credentials = { username, email, password };
    const resp = await criarConta(credentials);
    console.log("->Resposta do criar conta:");
    console.log(resp);
    if (resp.status !== 200) {
      alert("Não foi possível criar a conta!");
    } else {
      alert("Conta criada com sucesso!");
      navigation("/login");
    }
  };

  useEffect(() => {
    if(!photo) return;
    const photoURL = URL.createObjectURL(photo);
    setPhotoPreview(photoURL);
  }, [photo]);
  
  useEffect(() => {
    setPhotoPreview(null);
  }, []);

  return (
    <div className="container-principal">
      <div className="menu">
        <Link to="/" className="menu-item">
          Tela Inicial
        </Link>
        <Link to="/login" className="menu-item">
          Entrar
        </Link>
      </div>
      <div className="containers animate__animated animate__fadeInDown">
        <div className="frase-pagina">
          <h1 className="texto-frase">
            Bem-vindo ao <span className="cor-diferente">WorkSpace</span>
          </h1>
        </div>
        <div className="container-forms">
          <div>
            <h2 className="titulo-forms">Realize seu cadastro</h2>
            <div className="miniconainer-photo">
              <input type='file' id='file' ref={inputFile} onChange={(e) => carregarFoto(e)} accept="image/*" style={{display: 'none'}}/>
              <img className="icon-avatar" src={photoPreview == null ? IconAvatar : photoPreview} alt="Avatar" />
              <button className="button-camera" onClick={() => {abrirCaixaDialogo()}}><img className="icon-camera" src={IconPhoto} alt="Camera"></img></button>
            </div>
            <p className="label-forms">Nome</p>
            <input
              type="text"
              className="input-forms"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>

            <p className="label-forms">E-mail</p>
            <input
              type="email"
              className="input-forms"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <p className="label-forms">Senha</p>
            <input
              type="password"
              className="input-forms"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="button-forms" onClick={() => cadastrar()}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
export default CriarConta;
