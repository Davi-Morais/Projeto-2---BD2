const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastrarUsuario = async(req,res) =>{
    
    const errors =[]

    const { nome, email, senha, confirmarSenha} = req.body;

    const usuarioExiste = await Usuario.findOne({email:email});

    if(usuarioExiste){
        errors.push({text:"Error, Email já registrado"})
    }   

    if(senha!=confirmarSenha){
        errors.push({text:"Error, Senhas não conferem"})
    }
    if(senha.length < 3){
        errors.push({text:"Error, A senha deve ser maior que 3 caracteres"})
    }

    if(errors.length > 0){
        res.render("admin/cadastrar", {errors: errors})
    }else{ 
        const saltos = await bcrypt.genSalt(12);
        const password = await  bcrypt.hash(senha, saltos);

        const novoUsuario = new Usuario({
            nome: nome,
            email: email,
            senha: password
        });

        try{
            await novoUsuario.save();
            res.redirect('/admin/login')
        }
        catch(e){
            console.log(e);
        }
    }

}

exports.logarUsuario =async(req, res)=>{
        const { email, senha } = req.body;
        const user = await Usuario.findOne({email: email});
        const match = await bcrypt.compare(senha, user.senha);
        
        if (match) {
            const token = await jwt.sign(
            { userId: user._id },
            process.env.SECRET,
            { expiresIn: 3600 } // 1h
            );
    
            const tokenBearer = `Bearer ${token}`;
    
            req.session.user = user;
    
            res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
            res.set('Authorization', tokenBearer);
            res.redirect('/admin/anotacoes');
        } else {
            res.redirect('/admin/login')
        }
};

exports.logOutUsuario =async(req, res)=>{
    await req.session.destroy();
    res.clearCookie('access_token');
    res.redirect('/admin/anotacoes')
};