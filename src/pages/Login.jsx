import "../styles/login.css";
import "../styles/main.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="container-principal">
      <div className="menu">
        <Link to="/" className="menu-item">
          Tela Inicial
        </Link>
        <Link to="/criarConta" className="menu-item">
          Criar Conta
        </Link>
      </div>
      <div className="container-forms animate__animated animate__fadeInDown">
        <div>
          <h2 className="titulo-forms">Entre com sua conta</h2>
          <p className="label-forms">E-mail</p>
          <input type="email" className="input-forms" value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <p className="label-forms">Senha</p>
          <input type="password" className="input-forms" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
        </div>
        <button className="button-forms">Entrar</button>
      </div>
    </div>
  );
}

export default Login;
