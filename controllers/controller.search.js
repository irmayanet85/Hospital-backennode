/*jshint esversion: 6 */
/*jshint esversion: 8 */

const {response} = require ('express');
const Usuario = require('../model/User');
const Hospital = require('../model/Hospital');
const Medicos = require('../model/Medico');
const Medico = require('../model/Medico');



const searchEnyThing = async (req, res= response)=>{
     const search = req.params.value;
     const regex = new RegExp(search, 'i');
     const [usuarios, hospitales,medicos] = await Promise.all([
        Usuario.find({ name: regex}),
        Hospital.find({ name: regex}).populate('usuario', 'name email img rol google'),
        Medico.find({ name: regex}),

    ]);
     
     return res.status(200).json({
        ok: 'true',
        search,
        medicos,
        hospitales,
        usuarios

      }
       
     );
      
      // let listUsers = await Usuario.find().select({password:0, __v: 0 });
      // if (!listUsers){
      //   console.log('No hay uusuarios para listar');
      //   return res.status(204).json([]);
      // }
      // else{
          
      //     return res.status(200).json(
      //       listUsers
            
      //    ); 
    
      
   
  };
// const getUsuario = async (req, res= response)=>{
//      let _id = req.params.id;

//      console.log (_id);
      
//     let usuario = await Usuario.findById(_id).select({password:0, __v: 0 });
//     if (usuario){
//       console.log('usuario', usuario);
//       return res.status(201).json({
//         ok: true,
//         data : usuario
//       });
//     }
//     else{
//       return res.status(404).json({
//         ok: false,
//         data : {}
//       });
          
      
//     }
    
 
// };
// const deleteUsuario = async (req, res= response)=>{
    
//     const _id = req.params.id;
//     //console.log ('borrando usuario', _id);

//     try {
//       let deleted = await Usuario.deleteOne({_id : _id });
      
//       if (deleted.deletedCount >= 1) {
//         return res.status(201).json({
//           ok: true,
//           msg: `El usuario con id: ${_id} fue eliminado`,
//        });
//       } 
//       else{
//         return res.status(404).json({
//           ok: false,
//           msg: 'not deleted',
//         });
//       } 
      
//     }
   
//     catch (error) {
//       console.log(error);
//       res.status(500).json({
//         ok:false,
//         msg:'Error al borrar el usuario'
//       });
          
//     }
      
//   };
      
//   const updateUser = async (req, res= response)=>{
    
//     //console.log(req.body);
//     const id = req.params.id;

//     try {
//       let user = await Usuario.findById(id);
      
//       if (user){
//          let campos = req.body;
//          delete campos.password;
//          delete campos.google;
//          console.log('usuario', user);
//          const usuarioActual = await Usuario.findByIdAndUpdate(id,campos, {new:true});
  
//         console.log('usuario mod', user);
//           return res.status(201).json({
//             ok: true,
//             usuario: usuarioActual,
//           });
//       }
//       else{
//         return res.status(404).json({
//           ok: false,
//           msg: `No existe un usuario con el id: ${id}`,
//         });
//       }

//     }
   
//     catch (error) {
//       console.log(error);
//       res.status(500).json({
//         ok:false,
//         msg:'Error al actualizar el usuario. Puede que el usuario no exista'
//       });
          
//     }
      
//   };

  module.exports = {
    searchEnyThing,
    
};