import "../styles/login.css";
import "../styles/main.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { realizarLogin } from "../resources/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../resources/context";

function Login() {
  let navigation = useNavigate();
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function entrar(){
    const credentials = {email, password};
    const resp = await realizarLogin(credentials);
    console.log("->Resposta do login:");
    console.log(JSON.stringify(resp));
    if(resp.status !== 200){
      alert("Usuário ou senha inválidos");
    } else {
      let nomeUsuario = resp.msg.username;
      let email = resp.msg.email;
      context.setNome(nomeUsuario);
      context.setUserId(resp.msg.id);
      context.setEmail(resp.msg.email);
      localStorage.setItem("nomeUsuario", nomeUsuario);
      localStorage.setItem("email", email);
      //alert("Login realizado com sucesso");
      navigation("/principal");
    }
  }

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
      <div className="containers animate__animated animate__fadeInDown">
        <div className="frase-pagina">
          <h1 className="texto-frase">
            Entre no seu <span className="cor-diferente">WorkSpace</span>
          </h1>
        </div>
        <div className="container-forms">
          <div>
            <h2 className="titulo-forms">Entre com sua conta</h2>
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
          <button className="button-forms" onClick={() => entrar()}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
