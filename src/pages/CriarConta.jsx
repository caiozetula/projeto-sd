import "../styles/criarConta.css";
import "../styles/main.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormIcon from "../assets/forms-icon.png";

function CriarConta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = () => {
    console.log("Nome: " + nome);
    console.log("Email: " + email);
    console.log("Senha: " + senha);
  }

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
      <div className="container-forms animate__animated animate__fadeInDown">
        <div>
          <h2 className="titulo-forms">Realize seu cadastro</h2>
          <p className="label-forms">Nome</p>
          <input type="text" className="input-forms" value={nome} onChange={(e) => setNome(e.target.value)}></input>

          <p className="label-forms">E-mail</p>
          <input type="email" className="input-forms" value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <p className="label-forms">Senha</p>
          <input type="password" className="input-forms" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
        </div>
        <button className="button-forms" onClick={() => cadastrar()}>Cadastrar</button>
      </div>
    </div>
  );
}
export default CriarConta;
