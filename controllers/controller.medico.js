  /*jshint esversion: 6 */
/*jshint esversion: 8 */

const {response} = require ('express');
const Medico = require('../model/Medico');
const Hospital = require('../model/Hospital');

const crearMedico = async (req, res= response)=>{
  
  const usuario = req.id;
  const {hospitales, name} = req.body;
  const valid = await isValidArrayHospitalId(hospitales);
 
  if (valid == true){
    try {
    
      const MedicoDB = new Medico({name,usuario,hospitales});
      
      await MedicoDB.save();
    
      return res.status(201).json({
        ok: true,
        medico: MedicoDB
       
    
      }); 
              
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg:'Ocurrio un error inesperado',
    
      }); 
    
  }
    
   }
else {
  return res.status(400).json({
      ok: false,
      msg: `Debe especificar id de hospitales existentes y validos`,
    }); 

}
    

  };

  
    
  const deleteMedico = async (req, res= response)=>{
    
    const id = req.params.id;

    try {
      let deleted = await Medico.deleteOne({_id : id });
      
      if (deleted.deletedCount >= 1) {
        return res.status(201).json({
          ok: true,
          msg: `El Medico con id: ${id} fue eliminado`,
       });
      } 
      else{
        return res.status(404).json({
          ok: false,
          msg: 'No pudo ser eliminado',
        });
      } 
      
    }
   
    catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'Error inesperado al borrar el Medico'
      });
          
    }
      
  };

  const getMedico = async (req, res= response)=>{
    let id = req.params.id;

    console.log (id);
     
   let medico = await Medico.findById(id).populate('hospitales', 'name');
   if (medico){
     console.log('medico', medico);
     return res.status(201).json({
       ok: true,
       medico : medico
     });
   }
   else{
     return res.status(404).json({
       ok: false,
       data : {}
     });
         
     
   }
   

};
const listarMedico = async (req, res= response)=>{
  let from = Number(req.query.from)   || 0;
  console.log(from);  

  const [list, total] = await Promise.all([
    Medico
      .find()
        .populate('hospitales', 'id name')
        .populate('usuario', 'name email img')
      .skip(from)
      .limit(5),

    Medico.count()
  ]);
      
  if (!list){
    console.log('No hay medicos para listar');
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

const isValidArrayHospitalId = async (arrayHospital)=> {

  for (let index = 0; index < arrayHospital.length; index++) {
    const element = arrayHospital[index];
    const hospital =  await Hospital.findById(element);
    //console.log('hospital', hospital);
    if (!hospital) {
      console.log(false);
      return false;
    }
  }
  console.log(true);
  return true;
};
  

const updateMedico = async (req, res= response)=>{
    
  //console.log(req.body);
  const id = req.params.id;
  const {name, hospitales} = req.body;
  let arrayHospital = false;
  arrayHospital = await isValidArrayHospitalId(hospitales);
  console.log (arrayHospital);
  if (arrayHospital == false){
    return res.status(400).json({
      ok: false,
      msg: `Debe especificar id de hospitales existentes y validos`,
    });  
  }
  else {
    
    try {
      let medico = await Medico.findById(id);
      
      
      if (medico){
        medico.name = name;
        medico.hospitales = hospitales;
        
        try {
          await medico.save();
          
          //const medicoActual = await Medico.findByIdAndUpdate(id,{nombre, hospitales}, {new:true});
           return res.status(201).json({
             ok: true,
             medico: medico,
           });
        } catch (error) {
          return res.status(500).json({
            ok: false,
            msg: `Ocurrio un error inesperado intentando actualizar `,
          });  
        }
        
      }
      else{
        return res.status(404).json({
          ok: false,
          msg: `No existe un medico con el id: ${id}`,
        });
      }
  
    }
   
    catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'Error al actualizar el usuario. Puede que el usuario no exista'
      });
          
    }
      

  }
};



  module.exports = {
    crearMedico,
    deleteMedico,
    getMedico,
    listarMedico,
    updateMedico
    
};