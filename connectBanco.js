const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()

//Configurando Mongoose

mongoose.Promise = global.Promise

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Conectado")
}).catch((err)=>{
    console.log("Houve um erro ao se conectar com o banco ", err)
})

//Model - Anotações
//Definindo Model
const AnotacaoSchema = mongoose.Schema({
    titulo: {
        type: String, 
        require: true,
        weights: 2
    },
    conteudo:{
        type: String,
        require: true,
        weights: 1
    }
})

//Informando a Collection notas
mongoose.model('notas', AnotacaoSchema)

const newAnotacao = mongoose.model('notas')

new newAnotacao({
    titulo:"Testando titulo 1",
    conteudo:"Funcionou?"
}).save().then(()=>{
    console.log("Anotação salva com sucesso")
    }).catch((err)=>{
        console.log("Houve um erro ao salvar: ", err)
})
