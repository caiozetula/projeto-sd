import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CriarConta from "./pages/CriarConta";
import Principal from "./pages/Principal";
import { ContextProvider } from "./resources/context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route element={<CriarConta />} path="/criarConta" />
          <Route element={<Principal />} path="/principal" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
