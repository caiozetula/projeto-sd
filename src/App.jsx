import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CriarConta from "./pages/CriarConta";
import Principal from "./pages/Principal";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route element={<CriarConta />} path="/criarConta" />
          <Route element={<Principal />} path="/principal" />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
