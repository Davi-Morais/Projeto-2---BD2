const controller = require('./controller/operations');

const express = require('express');
const app = express();

app.use(express.json());


//rotas da aplicacao ////////////////
//buscar todas as anotacoes:
app.get(/(todas|all)|(anotacoes)/, controller.buscaTudo);

//busca por texto:
app.get('/textsearch/:buscar', controller.busca_textual);

//inserir nova anotacao:
app.post('/inserir', controller.inserir_documento);

//atualizar anotacao:
app.put('/atualizar/:title', controller.atualizar_documento);





app.listen(3000, ()=> console.log('Aplicacao rodando na rota 3000!'));