const client = require('../database/database');

//busca todos os documentos no banco
const buscaTudo = async ()=> {
    const array = [];
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find().toArray();
        resposta.forEach(result => {
            array.push(result);
        })
        console.log(array);
    } finally {
        await client.close();
    }
}

//busca por texto
const busca_textual = async (pesquisa) => {
    const array = [];
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find({ $text: { $search: pesquisa } }).toArray();
        resposta.forEach(result => {
            array.push(result);
        })
        console.log(array);

    } finally {
        await client.close();
    }
    return array;
}


//inserir documento
//Tem que receber um objeto
const inserir_documento = async (anotacao)=> {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        await anotacoes.insertOne({ titulo: anotacao.titulo, conteudo: anotacao.conteudo });
    }finally {
        client.close();
    }
}


//atualizar documento
//recebe documento
const atualizar_documento = async (req, res) => {
    try{
        await client.connect();
        const anotacoes = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
        
        const retorno = await anotacoes.replaceOne({conteudo: "Novo conteudo"}, {titulo: "Novos jogos", conteudo: "Novo conteudo"});
        
        //Verificar se algum usuário foi removido
        if(retorno.modifiedCount > 0){
            res.status(200).send("Usuário Atualizado");
        }else{
            res.status(400).send("Usuário não encontrado");
        }

    }catch{
        res.status(400).send('Falha ao listar');
    }finally{
        client.close();
    }
}

//deletar anotacao
const deletar_anotacao = async (req,res)=>{
    try{
        await client.connect();
        const anotacoes = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
        
        const retorno = await anotacoes.deleteOne({titulo: "Novos jogos"});
        
        //Verificar se algum usuário foi removido
        if(retorno.deletedCount > 0){
            res.status(200).send("Usuário removido");
        }else{
            res.status(400).send("Usuário não encontrado");
        }

    }catch{
        res.status(400).send('Falha ao listar');
    }finally{
        client.close();
    }
}
deletar_anotacao();

module.exports = {buscaTudo, busca_textual, inserir_documento, atualizar_documento};