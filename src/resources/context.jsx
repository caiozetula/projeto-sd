import React, {useState, createContext} from "react";

export const Context = createContext({
    nome: null,
    setNome: (a) => {},
    userId: null,
    setUserId: (a) => {},
});

export const ContextProvider = ({ children }) => {
    const [nome, setNome] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const val = {
        nome: nome,
        setNome: (a) => setNome(a),
        userId: userId,
        setUserId: (a) => setUserId(a),
    };

    return <Context.Provider value={val}>{children}</Context.Provider>
}
