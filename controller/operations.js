const client = require('../database/database');

const buscaTodo = async ()=> {
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
const busca_textual = async () => {
    try {
        await client.connect();
        const db = client.db('banco-deAnotacoes');
        const anotacoes = db.collection('Anotacoes');

        const resposta = await anotacoes.find({ $text: { $search: "segunda" } }).toArray();
        resposta.forEach(result => {
            console.log(result);
        })
    } finally {
        await client.close();
    }
}

busca_textual();