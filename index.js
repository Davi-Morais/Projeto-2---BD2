const controller = require('./controller/operations');

const express = require('express');
const app = express();


app.get(/(todas|all)|(anotacoes)/, controller.buscaTudo);



app.listen(3000, ()=> console.log('Aplicacao rodando na rota 3000!'));