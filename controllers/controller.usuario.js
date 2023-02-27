/*jshint esversion: 6 */
/*jshint esversion: 8 */
const bcr = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const {response} = require ('express');
//const { dbConnection } = require('../db/config');
const { BuildJWT } = require('../helper/jwp');
const Usuario = require('../model/User');

    //Pasado desde el body.
    // {
    //     "name": "irma",
    //     "email": "irmayanet@gmail.com",
    //     "password": "123456"
    
    // }

const crearUsuario = async (req, res= response)=>{
    
    //console.log(req.body);
    const {email, name, password, rolEdit} = req.body;
    
      const usuarioDB = new Usuario(req.body);
      //encripta
      const salt=bcr.genSaltSync();
      usuarioDB.password=bcr.hashSync(password,salt);
      //salvar el usuario
      await usuarioDB.save();
      //console.log(`fue creado el usuario ${usuarioDB.id}`);
      return res.status(201).json({
        ok: true,
        msg:'Fue creado',
        _id:usuarioDB.id,
        name,
        rolEdit

      }); 
     
            

  };

 const loginUsuario = async(req,res = response)=>{
    

    const {email, password} = req.body;
    
    if( password.length< 6 )
    {
      return res.status(400).json({
        ok: false,
        msg:'La contraseña no es valida'
        

      });

    }
    
   try {
     const dbUser = await  Usuario.findOne({email});
     if(!dbUser){
      return res.status(400).json({
        ok: false,
        msg:'El correo no existe'
        

      });

     }
     //confirmar si el password hace match
     if (dbUser.id){
        const validPass = bcrypt.compareSync(password, dbUser.password);
        if(!validPass){
          return res.status(400).json({
            ok: false,
            msg:'La contraseña es invalida'
    
          });

        }

            //generar jwt
      const token = await BuildJWT(dbUser.id,dbUser.name);
      //Respuesta del servicio
      return res.json({
       ok:true,
       id: dbUser.id,
       name: dbUser.name,
       email: dbUser.email,
       rol: dbUser.rol,
       token:token,
       rolEdit:dbUser.rolEdit
      });
      
     }
     
      
  
    
   } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg:'Hable con el admnistrador'
    });
   }

    
  };

  const renewToken = async(req,res=response)=>{
     const token = req.header('x-token');
     const { id , name } = req;
     //console.log('dentro de renew token', id, name);
     
     
     if (!token){
      return res.status(401).json({
        ok:false,
        msg: 'Token no enviado'
      });
     }
     //console.log('id', id);
     const dbUser = await  Usuario.findById(id);
    
    //console.log('datos del usuario', dbUser.email, dbUser.id);
    const new_jwt = await BuildJWT(dbUser.id,dbUser.name);
    return res.json({
      ok: true,
      token: new_jwt,
      user: dbUser
    });
  };


  module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};