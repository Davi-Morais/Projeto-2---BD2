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



module.exports = {buscaTudo, busca_textual, inserir_documento};