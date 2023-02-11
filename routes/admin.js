const express = require('express');
const router = express.Router();
const anotacao_controller = require('../controllers/anotacao_controller');
const usuario_controller = require('../controllers/usuario_controller');
const middleware = require('../middlewares/middleware');
const {checkToken} = require('../middlewares/middleware');
router.use(middleware.middlewareGlobal, );


//ROTAS PARA PAG PRINCIPAL
router.get('/', (req, res)=>{
    res.redirect("admin/cadastro");
})

//ROTAS PARA CADASTRO E LOGIN

//CADASTRO
router.get('/cadastro', (req, res)=>{
    res.render("admin/cadastrar");
})
router.post('/NewCadastro', checkToken, usuario_controller.cadastrarUsuario)


//LOGIN
router.get('/login', (req, res)=>{
    res.render("admin/login");
})
router.post('/NewLogin', usuario_controller.logarUsuario)

router.get('/logOut', checkToken, usuario_controller.logOutUsuario)


router.get('/anotacoes', anotacao_controller.Mostrar);


//ROTAS PARA ADICIONAR
router.get('/anotacoes/add', (req, res)=>{
    res.render("admin/add_anotacoes")
})
router.post('/anotacoes/new', checkToken, anotacao_controller.AdicionarNota)


//ROTA PARA EDITAR
router.get("/anotacoes/edit/:id", anotacao_controller.GetIDNota)
router.post("/anotacoes/edit", anotacao_controller.EditandoNota)


//ROTA PARA DELETAR
router.post('/anotacoes/deletar', anotacao_controller.DeletarNota)


//ROTA PARA BUSCA TEXTUAL
router.post('/anotacoes/buscaTextual', anotacao_controller.BuscarNota)

module.exports = router