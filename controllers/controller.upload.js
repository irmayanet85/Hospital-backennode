/*jshint esversion: 6 */
/*jshint esversion: 8 */

const {response} = require ('express');
const { v4: uuidv4 } = require('uuid');



const Usuario = require('../model/User');
const Hospital = require('../model/Hospital');
const Medico = require('../model/Medico');
const { updateImgage } = require('../helper/updateImage');



const uploadImage =  (req, res= response)=>{
  const type = req.params.type;
  const id = req.params.id;
  validtype = ['hospital', 'user', 'medico'];

  if (!validtype.includes(type)){
    return res.status(400).json({
      ok: false,
      msg: 'Debe ser un tipo valido : medico, hospital, user',
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'Debe especificar una imagen',
    });
  }

      //extaer la imagen
  const img = req.files.image;
    
  //validar extension
  extensionValida = ['jpg', 'png'];
  const imgsplit = img.name.split('.');
  const extension = imgsplit[imgsplit.length -1];
  if (!extensionValida.includes(extension)){
    return res.status(400).json({
      ok: false,
      msg: 'Debe especificar una imagen con un formato en jpg o png',
    });
  }     
  const filename = `${uuidv4()}.${extension}`;
  //almacenar imagen
  const dir = `./upload/${type}/${filename}`;
  //console.log(type, dir);
  
  img.mv(dir, (err)=> {
    if (err){
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Ocurrio un error al mover el archivo',
      });
    }
  });
   updateImgage(id, type, `./${process.env.DIR_IMG}/${type}`, filename).then(
    result=> {
      console.log ('resultado', result);
      if (result == true){
        return res.status(200).json({
          ok: 'true',
          type,
          id,
          filename
      
        });
      }
      else {
        return res.status(500).json({
          ok: 'false',
          msg: 'Ocurrio un error en el proceso de actualizar la img'
      
        });
      }
    }
   );
  
 

       
      

  };

  module.exports = {
    uploadImage,
    
};