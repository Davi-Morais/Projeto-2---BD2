const client = require('../database/database');

//busca todos os documentos no banco
const buscaTudo = async (req, res)=> {
    const array = [];
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find().toArray();
        resposta.forEach(result => {
            array.push(result);
        })
        res.send(array);
    } finally {
        await client.close();
    }
}

//busca por texto
const busca_textual = async (req, res) => {
    const array = [];
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find({ $text: { $search: req.params.buscar } }).toArray();
        if(resposta.length > 0){
            resposta.forEach(result => {
                array.push(result);
            })
            res.send(array);
        } else {
            res.send('Nenhum resultado encontrado.');
        }
        
    } finally {
        await client.close();
    }
}


//inserir documento
//Tem que receber um objeto
const inserir_documento = async (req, res)=> {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        await anotacoes.insertOne(req.body);
    }finally {
        client.close();
    }
    res.redirect('/all');
}


//atualizar documento
//recebe documento/objeto
const atualizar_documento = async (req, res) => {
    try{
        await client.connect();
        const anotacoes = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
        
        const retorno = await anotacoes.replaceOne({titulo: req.params.title}, req.body);
        
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
        
        const retorno = await anotacoes.deleteOne({titulo: req.params.title});
        
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

module.exports = {buscaTudo, busca_textual, inserir_documento, atualizar_documento, deletar_anotacao};