const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Anotacao')
const anotacao = mongoose.model('notas')





//ROTAS PARA PAG PRINCIPAL
router.get('/', (req, res)=>{
    res.redirect("admin/anotacoes")
})

router.get('/anotacoes', (req, res)=>{
    anotacao.find().then((anotacoes)=>{
        res.render("admin/anotacoes", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error") 
        res.redirect('/admin')
    })
})


//ROTAS PARA ADICIONAR
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

//ROTA PARA EDITAR
router.get("/anotacoes/edit/:id", (req, res)=>{
    anotacao.findOne({_id: req.params.id}).then((anotacao)=>{
        res.render("admin/edit_anotacoes", {anotacao: anotacao})
    }).catch((err)=>{
        res.redirect("/admin/anotacoes")
    })
    
})

router.post("/anotacoes/edit", (req, res)=>{
    anotacao.findOne({_id: req.body.id}).then((anotacao)=>{
        anotacao.titulo = req.body.titulo
        anotacao.conteudo = req.body.conteudo

        anotacao.save().then(()=>{
            console.log("Salvo com sucesso!")
            res.redirect('/admin/anotacoes')
        }).catch((err)=>{
            console.log("Erro na linha 63", err)
        })


    }).catch((err)=>{
        console.log('Erro linha 59', err)
        res.redirect('/admin/anotacoes')
    })
})

//ROTA PARA DELETAR
router.post('/anotacoes/deletar', (req, res)=>{
    anotacao.remove({_id: req.body.id}).then(()=>{
        console.log("removido com sucesso!")
        res.redirect('/admin/anotacoes')
    }).catch((err)=>{
        console.log("erro ao remover")
        res.redirect('/admin/anotacoes')
    })
})

//ROTA PARA BUSCA TEXTUAL

router.get('/anotacoes/busca', (req, res)=>{
    res.render("admin/teste")
})

router.post('/anotacoes/teste', async (req, res)=>{
    const cursor = await anotacao.find( 
        {$text: { $search: req.body.query}}, 
        {score: { $meta: "textScore" }}
        )
        .sort({ score : { $meta : 'textScore' } }).then((anotacoes)=>{
        res.render("admin/teste", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error") 
        res.redirect('/admin')
    })
})

module.exports = router