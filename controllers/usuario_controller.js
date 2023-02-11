const Usuario = require("../models/usuario");

exports.cadastrarUsuario = async(req,res) =>{
  
    const { nome, email, senha, confirmarSenha} = req.body;

    const usuarioExiste = await Usuario.findOne({email:email});

    if(usuarioExiste){
        return res.status(422).json({msg:"Email ja cadastrado, insira outro e-mail"});
    }

    const saltos = await bcrypt.genSalt(12);
    const password = await  bcrypt.hash(senha, saltos);

    const novoUsuario = new Usuario({
        nome: nome,
        email: email,
        senha: password
    });

    try{
        await novoUsuario.save();
        
    }
    catch(e){
        console.log(e);
    }
    res.redirect('admin/login')
}