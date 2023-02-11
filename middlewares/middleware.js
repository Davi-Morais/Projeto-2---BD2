const jwt = require('jsonwebtoken');

exports.middlewareGlobal = async (req, res, next) => {
    res.locals.user = req.session.user
    next();

}

exports.checkToken = async(req, res, next)=>{
  const {access_token} = req.cookies

  if(access_token){
    try {
      const [, token] = access_token.split(' ');
      await jwt.verify(token, process.env.SECRET)
      console.log('Acesso autorizado')
      next()
    } catch (error) {
      console.log(error)
      res.redirect('/admin/anotacoes')
    }
    }else{
      req.session.user = null
      console.log('Acesso negado, necessário realizar login')
      return res.redirect('/admin/login')
}

};