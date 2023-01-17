require('dotenv').config();

//arquivo responsavel por realizar a conexao com o banco MongoDB
const { MongoClient } = require('mongodb');

//URI
const uri = `mongodb://${process.env.HOSTNAME_IP}`;

const client = new MongoClient(uri);

module.exports = client;


