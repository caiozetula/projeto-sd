import axios from "axios";
const enderecoApi = "http://localhost:5000/api";

export async function realizarLogin(usuario) {
    try{
        const resposta = await axios.post(enderecoApi + "/auth/login", usuario);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function getPostsTimeline(userId) {
    try{
        let body = {
            userId: userId
        }
        const resposta = await axios.post(enderecoApi + "/posts/timeline/all", body);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function criarPost(post) {
    try{
        const resposta = await axios.post(enderecoApi + "/posts/", post);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    } catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function criarConta(usuario) {
    try{
        const resposta = await axios.post(enderecoApi + "/auth/register", usuario);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function getUsuario(email) {
    try{
        const resposta = await axios.get(enderecoApi + "/users/" + email);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function seguirUsuario(email, body){
    try{
        const resposta = await axios.put(enderecoApi + "/users/" + email + "/follow", body);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function likeDislike(postId, body){
    try{
        const resposta = await axios.put(enderecoApi + "/posts/" + postId + "/like", body);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }
}

export async function delePost(postId){
    try{
        const resposta = await axios.delete(enderecoApi + "/posts/" + postId);
        const dados = {status: resposta.status, msg: resposta.data};
        return dados;
    }catch(e){
        const dados = {status: 503, msg: e.toString()};
        return dados;
    }

}