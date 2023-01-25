//Módulos
const express = require("express")
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const app = express()
const admin = require("./routes/admin")
const path = require ('path')

//CONFIGURAÇÕES
    //BODY-PARSER
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //HANDLEBARS
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //PUBLIC
    app.use(express.static(path.join(__dirname, 'public')))


//ROTAS
app.use('/admin', admin)


//Outer
app.listen(3000, ()=>{
    console.log("Servidor rodando: http://localhost:3000")
})