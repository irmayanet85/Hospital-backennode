
/*jshint esversion: 6 */
/*jshint esversion: 8 */
const { response } = require("express");
const Usuario = require('../model/User');


const validarEmailnotExist = async(req,res = response, next) => {
  
  const {email} = req.body;
  let result = await Usuario.findOne({ email });
  if (result){
    return res.status(400).json({
      ok: false,
      msg: `El correo ${email} ya existe`
    });
  }

  next();
};

module.exports = {
  validarEmailnotExist
};


