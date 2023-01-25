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


