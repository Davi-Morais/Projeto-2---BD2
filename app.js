//Módulos
const express = require("express")
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const app = express()
const admin = require("./routes/admin")
const path = require ('path')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
dotenv.config()

//CONFIGURAÇÕES
    //BODY-PARSER
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //HANDLEBARS
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }))
    app.set('view engine', 'handlebars')

    //CONECTANDO NO BANCO

        mongoose.Promise = global.Promise
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("MongoDB Conectado")
        }).catch((err)=>{
            console.log("Houve um erro ao se conectar com o banco ", err)
        })

    //PUBLIC
    app.use(express.static(path.join(__dirname, 'public')))


//ROTAS
app.use('/admin', admin)


//Outer
app.listen(3000, ()=>{
    console.log("Servidor rodando: http://localhost:3000/admin")
})