/*jshint esversion: 6 */
/*jshint esversion: 8 */
const { response } = require("express");
const Usuario = require('../model/User');



const isUserAdmin = async(req,res = response, next) => {

    
  const {id, name} = req;
  console.log('id del autenticado', id, name);
  //console.log('req', req);
  let user = await Usuario.findById(id);
  if (user){
    if (user.rol == 'ADMIN_ROLE') {
      next();
      
    } 
    else{
      return res.status(401).json({
        ok: false,
        msg: `El usuario no tiene permisos para ejecutar esta accion.`
      });
    }
    
  }
  
  else{
    return res.status(401).json({
      ok: false,
      msg: `Debe autenticarse`
    });
  }
  

  
};


module.exports = {
  isUserAdmin
};