/*jshint esversion: 6 */
/*jshint esversion: 8 */
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

//el async por defecto retorna una promesa

const dbConnection = async() =>{
 
   try {
      //el await le esta diciendo que se espere  a que espere todo esto, haciendolo un proceso sincrono.
      await mongoose.connect(process.env.BD_CNN);  
      console.log('Exito')  ;
      // Make the appropriate DB calls
      
   } catch (er) { 
      
      console.log(er);
      throw new Error('Error al conectarse');
   }

 
};



module.exports = {
dbConnection
};