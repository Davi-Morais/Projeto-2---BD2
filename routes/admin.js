const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Anotacao')
const anotacao = mongoose.model('notas')



router.get('/', (req, res)=>{
    res.render("admin/index")
})

router.get('/anotacoes', (req, res)=>{
    anotacao.find().then((anotacoes)=>{
        res.render("admin/anotacoes", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error")
        res.redirect('/admin')
    })
})

router.get('/anotacoes/add', (req, res)=>{
    res.render("admin/add_anotacoes")
})

router.post('/anotacoes/new', (req, res) =>{
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
})




router.post('/anotacoes/deletar', (req, res)=>{
    anotacao.remove({_id: req.body.id}).then(()=>{
        console.log("removido com sucesso!")
        res.redirect('/admin/anotacoes')
    }).catch((err)=>{
        console.log("erro ao remover")
        res.redirect('/admin/anotacoes')
    })
})



module.exports = router