/*jshint esversion: 6 */
/*jshint esversion: 8 */

const {response} = require ('express');
const { remove } = require('../model/User');
const Usuario = require('../model/User');

const listarUsuario = async (req, res= response)=>{

  let from = Number(req.query.from)   || 0;
  //console.log(from);  

  const [list, total] = await Promise.all([
    Usuario
      .find()
      .skip(from)
      .limit(5),

    Usuario.count()
  ]);

    
  if (!list){
    console.log('No hay usuarios para listar');
    return res.status(204).json([]);
  }
  else{
      
      return res.status(200).json({
        list : list,
        total : total,
      }
       
        
     ); 
  }
      
   
  };
const getUsuario = async (req, res= response)=>{
     let _id = req.params.id;

     console.log (_id);
      
    let usuario = await Usuario.findById(_id).select({password:0, __v: 0 });
    if (usuario){
      //console.log('usuario', usuario);
      return res.status(201).json({
        ok: true,
        data : usuario
      });
    }
    else{
      return res.status(404).json({
        ok: false,
        data : {}
      });
          
      
    }
    
 
};
const deleteUsuario = async (req, res= response)=>{
    
    const _id = req.params.id;
    //console.log ('borrando usuario', _id);

    try {
      let deleted = await Usuario.deleteOne({_id : _id });
      
      if (deleted.deletedCount >= 1) {
        return res.status(201).json({
          ok: true,
          msg: `El usuario con id: ${_id} fue eliminado`,
       });
      } 
      else{
        return res.status(404).json({
          ok: false,
          msg: 'not deleted',
        });
      } 
      
    }
   
    catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'Error al borrar el usuario'
      });
          
    }
      
  };
      
const updateUser = async (req, res= response)=>{
    
    //console.log(req.body);

    const id = req.params.id;
    const { email , name } = req.body;
    console.log ('email y user', email, name);
    let user = await Usuario.findById(id);
      
      if (user){
         user.name = name;
         user.email = email;
         try {
           await user.save();
           
           //console.log('usuario mod', user);
           return res.status(201).json({
             ok: true,
             usuario: user,
            });
          }
          catch (error) {
            console.log(error);
            res.status(500).json({
              ok:false,
              msg:'Error al actualizar el usuario'
            });
                
          }
      }
      else{
        return res.status(404).json({
          ok: false,
          msg: `No existe un usuario con el id: ${id}`,
        });
      }

    
   
      
  };

const updateRolUser = async (req, res= response)=>{

    const id = req.params.id;
    const { rol } = req.body;
    console.log ('rol user', rol);
    const rolsArray = ['ADMIN_ROLE', 'USER_ROLE'];
    let user = await Usuario.findById(id);
    if (!rolsArray.includes(rol))
    {
      return res.status(404).json({
        ok: false,
        msg: `El rol especificado no esta dentro de los comprendidos`
      });

    }
      
      if (user){
         user.rol = rol;
         try {
           await user.save();
           
           //console.log('usuario mod', user);
           return res.status(201).json({
             ok: true,
             rol,
            });
          }
          catch (error) {
            console.log(error);
            res.status(500).json({
              ok:false,
              msg:'Error al actualizar el usuario'
            });
                
          }
      }
      else{
        return res.status(404).json({
          ok: false,
          msg: `No existe un usuario con el id: ${id}`,
        });
      }

    
   
      
  };

  module.exports = {
    listarUsuario,
    deleteUsuario,
    updateUser,
    getUsuario,
    updateRolUser
    
};