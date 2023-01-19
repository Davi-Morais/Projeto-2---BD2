const controller = require('./controller/operations');

const express = require('express');
const app = express();

//buscar todas as anotacoes:
app.get(/(todas|all)|(anotacoes)/, controller.buscaTudo);

//busca por texto
app.get('/textsearch/:buscar', controller.busca_textual);


app.listen(3000, ()=> console.log('Aplicacao rodando na rota 3000!'));