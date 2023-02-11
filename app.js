//Módulos
const express = require("express")
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const app = express()
const admin = require("./routes/admin")
const path = require ('path')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const session = require('express-session')
const cookieParser = require('cookie-parser');


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

    //SESSIONS 
    const sessionOptions = session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        }
    });

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
app.use(sessionOptions);
app.use(cookieParser());
app.use('/admin', admin)




//Outer
app.listen(3000, ()=>{
    console.log("Servidor rodando: http://localhost:3000/admin/anotacoes");
})