const controller = require('./controller/operations');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

app.get('/home', controller.homeEJS);

//rotas da aplicacao ////////////////
//buscar todas as anotacoes:
app.get('/all', controller.buscaTudo);

//busca por texto:
app.get('/textsearch/:buscar', controller.busca_textual);

//inserir nova anotacao:
app.post('/inserir', controller.inserir_documento);

//atualizar anotacao:
app.put('/atualizar/:title', controller.atualizar_documento);

//deletar anotacao:
app.delete('/deletar/:title', controller.deletar_anotacao);





app.listen(3000, ()=> console.log('Aplicacao rodando na rota 3000!'));