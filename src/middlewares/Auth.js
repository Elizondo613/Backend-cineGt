export const verifyToken = async (req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
      res.status(401).send({
        error: "El usuario necesita estar autenticado"
      })
      return
    }
    if(token.startsWith('Bearer ')){
      token = token.slice(7, token.length);
      console.log(token);
    }
    if(token){
      jwt.verify(token, config.SECRET, (error, decoded)=>{
        if(error){
          return res.json({
            message: 'El token no es valido'
          });
        }else{
          req.decoded = decoded;
          next();
        }
      });
    }
  }; 