import { useContext, useState } from "react";

export const ContextProvider = useContext({
    nome: null,
    setNome: (a) => {},
});

const Context = ({children}) => {
    const [nome, setNome] = useState(null);
    const val = {
        //inserir os dados do contexto
    }
    return <ContextProvider.Provider value={val}>{children}</ContextProvider.Provider>
}
export default Context;