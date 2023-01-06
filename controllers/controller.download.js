/*jshint esversion: 6 */
/*jshint esversion: 8 */

const {response} = require ('express');
const path = require('path');
const fs = require('fs');

const downloadImage =  (req, res= response)=>{

 
  const type = req.params.type;
  const nameImage = req.params.nameimage;
  validtype = ['hospital', 'user', 'medico'];
    
  if (!validtype.includes(type)){
    return res.status(400).json({
      ok: false,
      msg: 'Debe ser un tipo valido : medico, hospital, user',
    });
  }
  
  const mypath = path.join(__dirname, `../${process.env.DIR_IMG}/${type}/${nameImage}`);
  console.log (mypath);
  const existImg = fs.existsSync(mypath);
  if (existImg == true){
      try {
        res.sendFile(mypath);
           
      } 
      catch (error) {
          console.log(error) ;
          return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado enviando la img',
          }); 
      }
      
  }
  else {
    const mypath_notfound = path.join(__dirname, `../${process.env.DIR_IMG}/imgNotFound.jpg`);
    res.sendFile(mypath_notfound);
  }

};

  module.exports = {
    downloadImage,
    
};