const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anotacao = new Schema({
    titulo: {
        type: String, 
        required: true,
        weights: 2
    },
    conteudo:{
        type: String,
        required: true,
        weights: 1
    },
    
})
anotacao.index({titulo: 'text', conteudo: 'text'})
mongoose.model('notas', anotacao)