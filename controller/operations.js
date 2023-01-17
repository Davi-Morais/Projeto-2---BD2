const client = require('../database/database');

//busca todos os documentos no banco
const buscaTudo = async ()=> {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find().toArray();
        resposta.forEach(result => {
            console.log(result);
        })
    } finally {
        await client.close();
    }
}

//busca por texto
const busca_textual = async (pesquisa) => {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const anotacoes = db.collection(process.env.COLLECTION_NAME);

        const resposta = await anotacoes.find({ $text: { $search: pesquisa } }).toArray();
        resposta.forEach(result => {
            console.log(result);
        })
    } finally {
        await client.close();
    }
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
const anotacao = {
    titulo: "Novos jogos", 
    conteudo: "Muitos rpgs novos em 2023, hein?"
}
inserir_documento(anotacao);

module.exports = {buscaTudo, busca_textual};