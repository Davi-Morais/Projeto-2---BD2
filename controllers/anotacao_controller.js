const Anotacao = require('../models/Anotacao')
const mongoose = require('mongoose');
const {sessionAura} = require('../db/Neo4jDatabase');
const crypto = require('crypto');
anotacao = mongoose.model('notas');


exports.Mostrar = async(req, res)=>{
    anotacao.find().then((anotacoes)=>{
        res.render("admin/anotacoes", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error") 
        res.redirect('/admin')
    })
}

exports.AdicionarNota = async(req, res)=>{

    const idBytes = crypto.randomBytes(8); // 8 bytes (64 bits) é suficiente para uma baixa chance de colisão
    const idHash = crypto.createHash('sha256').update(idBytes).digest('hex');

    const email = req.session.user.email;

    const newAnotacao = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        id: idHash
    }

    try {
        const result = await sessionAura.run(`CREATE (a: Annotation{id: '${idHash}'})`);
  
    }catch (error) {
        console.error(error);
    } 

    new anotacao(newAnotacao).save().then(()=>{
        console.log("Anotação salva com sucesso")
    }).catch((err)=>{
        console.log("Erro ao salvar anotação")
    })

    try {
        const result = await sessionAura.run(`MATCH (p: Person{email: "${email}"}) OPTIONAL MATCH (n: Annotation{id: "${idHash}"}) CREATE (p)-[:CRIOU]->(n)`);
        sessionAura.close();
    }catch (error) {
        console.error(error);
    } 

    res.redirect('/admin/anotacoes');
}

exports.GetIDNota = async(req, res)=>{
    anotacao.findOne({_id: req.params.id}).then((anotacao)=>{
        res.render("admin/edit_anotacoes", {anotacao: anotacao})
    }).catch((err)=>{
        res.redirect("/admin/anotacoes")
    })
}

exports.EditandoNota = async(req, res)=>{
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
}

exports.DeletarNota = async(req, res)=>{

    try {
        const result = await sessionAura.run(`MATCH (a:Annotation {id: '${req.body.id}'}) DETACH DELETE a`);
        sessionAura.close();
        console.log("Nó deletado com sucesso ");
      } catch (error) {
        console.error(error);
    }

    anotacao.remove({_id: req.body.id}).then(()=>{
        console.log("removido com sucesso!")
        res.redirect('/admin/anotacoes')
    }).catch((err)=>{
        console.log("erro ao remover")
        res.redirect('/admin/anotacoes')
    })
}

exports.BuscarNota = async(req, res)=>{
    const cursor = await anotacao.find( 
        {$text: { $search: req.body.query}}, 
        {score: { $meta: "textScore" }}
        )
        .sort({ score : { $meta : 'textScore' } }).then((anotacoes)=>{
        res.render("admin/anotacoes", {anotacoes: anotacoes})
    }).catch((err)=>{
        console.log("error") 
        res.redirect('/admin')
    })
}