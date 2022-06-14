import React, {useState, createContext} from "react";

export const Context = createContext({
    nome: null,
    setNome: (a) => {},
});

export const ContextProvider = ({ children }) => {
    const [nome, setNome] = useState(null);
    
    const val = {
        nome: nome,
        setNome: (a) => setNome(a),
    };

    return <Context.Provider value={val}>{children}</Context.Provider>
}
