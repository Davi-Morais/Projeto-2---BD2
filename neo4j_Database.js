const anotacao_controller = require('./controllers/anotacao_controller');
const usuario_controller = require('./controllers/usuario_controller');
const dotenv = require("dotenv")
dotenv.config()
const neo4j = require('neo4j-driver')
const driver = neo4j.driver(process.env.uri, neo4j.auth.basic(process.env.user, process.env.password))


const session = driver.session({
    database: "neo4j",
})
req.body('suco')
usuario_controller.cadastrarUsuario()

console.log("Conectado ao banco neo4j")