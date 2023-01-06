/*jshint esversion: 6 */
/*jshint esversion: 8 */

const fs = require('fs');
const {response} = require ('express');

const Usuario = require('../model/User');
const Medico = require('../model/Medico');
const Hospital = require('../model/Hospital');




const  updateImgage = async( id , type, dir, newNameImage ) => {

    try {
        switch (type) {
            case 'medico':
                let medico = await Medico.findById(id);
                if (medico){
                    //necesito fisicamente borrar imagen vieja?
                    //de existir la borro
                    if (medico.img){
                        const oldNameImage = medico.img;
                        await tryDeleteImage ( dir, oldNameImage );
                    }
                    //salvo el nombre de la imagen el el objeto de bd
                    medico.img = newNameImage;
                    medico.save();
                    return true;
                }
                
                else return false;
                break;
            case 'hospital':
                let hospital = await Hospital.findById(id);
                if (hospital){
                    if (hospital.img){
                        const oldNameImage = hospital.img;
                        await tryDeleteImage ( dir, oldNameImage );
                    }
                    //salvo el nombre de la imagen el el objeto de bd
                    hospital.img = newNameImage;
                    hospital.save();
                    return true;
                }
                
                else return false;
                break;
                
            case 'user':
                let user = await Usuario.findById(id);
                if (user){
                    if (user.img){
                        console.log (user.img);
                        console.log ('el borrado fue :', tryDeleteImage ( dir, user.img ))
                    }
                    //salvo el nombre de la imagen el el objeto de bd
                
                    user.img = newNameImage;
                    await user.save();
                    console.log ('salvado');
                    return true;
                }
                
                else return false;
                break;
        
        }
    }
    catch (error) {
      console.log(error);
      return false;
          
    }
      

};

const tryDeleteImage = ( dir, oldNameImage ) =>{
    const directory = `${dir}/${oldNameImage}`;
    console.log(directory);
    const existOldNameImage = fs.existsSync(directory);
    if (existOldNameImage == true){
        try {
            fs.unlinkSync(directory);
            return true;    
        } 
        catch (error) {
            console.log(error) ;
            return false;
        }
    }
    else return false;
};

module.exports = {
    updateImgage
};