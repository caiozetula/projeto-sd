import "../styles/criarConta.css";
import "../styles/main.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { criarConta } from "../resources/api";

function CriarConta() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function cadastrar() {
    const credentials = {username, email, password};
    const resp = await criarConta(credentials);
    console.log("->Resposta do criar conta:");
    console.log(resp);
    if(resp.status !== 200){
      alert("Não foi possível criar a conta!");
    } else {
      alert("Conta criada com sucesso!");
    }
  };

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
