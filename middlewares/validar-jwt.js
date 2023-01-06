/*jshint esversion: 6 */
/*jshint esversion: 8 */
const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req,res = response, next) => {

    const token = req.header('x-token');
     
     if (!token){
      return res.status(401).json({
        ok:false,
        msg: 'Token no enviado'
      });
     }

     try {
        //debe retornar el payload
       const { id , name } = jwt.verify(token, process.env.MYSECRETE);
      
       req.id = id;
       req.name = name;
       //console.log('dentro de validar jwt', id) ;
       next();
        
     } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
          });
     }
     

};


module.exports = {
    validarJWT
};