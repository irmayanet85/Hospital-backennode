
/*jshint esversion: 6 */
/*jshint esversion: 8 */
const { response } = require("express");
const Usuario = require('../model/User');


const validarUsuarioExist = async(req,res = response, next) => {
  
  const id = req.id;
  let result = await Usuario.findById(id);
  if (!result){
    return res.status(400).json({
      ok: false,
      msg: `El id ${usuario} no existe`
    });
  }
  console.log('el usuario existe');
  next();
};

module.exports = {
  validarUsuarioExist
};


