const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Anotacao')
const anotacao = mongoose.model('notas')



router.get('/', (req, res)=>{
    res.render("admin/index")
})

router.get('/anotacoes', (req, res)=>{
    res.render("admin/anotacoes")
})

router.get('/anotacoes/add', (req, res)=>{
    res.render("admin/add_anotacoes")
})

router.post('/anotacoes/new', (req, res) =>{

})




module.exports = router