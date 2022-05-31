import "./App.css";
import { Link } from "react-router-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CriarConta from "./pages/CriarConta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Home/> } path="/" exact />
        <Route element={ <Login/> } path="/login" />
        <Route element={ <CriarConta/> } path="/criarConta" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
