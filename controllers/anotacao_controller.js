const Anotacao = require('../models/Anotacao')
const mongoose = require('mongoose');
anotacao = mongoose.model('notas')

exports.Mostrar = async(req, res)=>{
    anotacao.find().then((anotacoes)=>{
        res.render("admin/anotacoes", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error") 
        res.redirect('/admin')
    })
}

exports.AdicionarNota = async(req, res)=>{
    const newAnotacao = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }

    new anotacao(newAnotacao).save().then(()=>{
        res.redirect('/admin/anotacoes')
        console.log("Anotação salva com sucesso")
    }).catch((err)=>{
        console.log("Erro ao salvar anotação")
    })
}