import React, {useState, createContext} from "react";

export const Context = createContext({
    nome: null,
    setNome: (a) => {},
    userId: null,
    setUserId: (a) => {},
    email: null,
    setEmail: (a) => {},
});

export const ContextProvider = ({ children }) => {
    const [nome, setNome] = useState(null);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    
    const val = {
        nome: nome,
        setNome: (a) => setNome(a),
        userId: userId,
        setUserId: (a) => setUserId(a),
        email: email,
        setEmail: (a) => setEmail(a),
    };

    return <Context.Provider value={val}>{children}</Context.Provider>
}
